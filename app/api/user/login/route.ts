import { NextResponse } from "next/server";
import { userLoginType, userLoginValidator } from "@/validators/userValidator";
import { ValidationError } from "yup";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import useJWT from "@/hooks/useJWT";

const prisma = new PrismaClient();

async function main(data: userLoginType) {
    const { encodeJWT } = useJWT();
    const user = await prisma.user.findUnique({
        where: {
            login: data.login,
        },
    });
    if (user === null) {
        throw Error("User not found");
    }
    const res = await compare(data.password, user.password_hash);
    if (!res) {
        throw Error("Wrong password!");
    }
    const accessToken = await encodeJWT(
        { login: user.login, name: user.name, img: user.image },
        "1h"
    );
    return { accessToken: accessToken, refreshToken: user.refreshToken };
}

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const user = await userLoginValidator.validate(data);
        let resp: NextResponse;
        try {
            const { accessToken, refreshToken } = await main(user);
            await prisma.$disconnect();
            resp = NextResponse.json({
                status: 1,
                data: { accessToken: accessToken, refreshToken: refreshToken},
            });
            // resp.cookies.set("refreshToken", refreshToken, {
            //     sameSite: "strict",
            //     httpOnly: true,
            // });
        } catch (e: any) {
            resp = NextResponse.json({ status: -1, message: e.message });
            await prisma.$disconnect();
        } finally {
            await prisma.$disconnect();
        }
        return resp;
    } catch (e: unknown) {
        if (e instanceof ValidationError) {
            return NextResponse.json({ status: -1, message: e.message });
        }
    }
}
