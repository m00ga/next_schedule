import { NextResponse } from "next/server";
import {
    userRegisterValidator,
    userRegisterType,
} from "@/validators/userValidator";
import { ValidationError } from "yup";
import { PrismaClient } from "@prisma/client";
import useJWT from "@/hooks/useJWT";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

interface PrismaRegisterSchema extends Omit<userRegisterType, "password"> {
    password_hash: string;
    refreshToken: string;
}

async function main(data: PrismaRegisterSchema) {
    await prisma.user.create({
        data: { ...data },
    });
}

export async function POST(req: Request) {
    const data = await req.json();
    const { encodeJWT } = useJWT();
    try {
        const user = await userRegisterValidator.validate(data);
        const accessToken = await encodeJWT(
            { login: user.login, name: user.name, img: user.image },
            "1h"
        );
        const refreshToken = await encodeJWT(
            { login: user.login, name: user.name, img: user.image },
            "30d"
        );
        const passHash = await hash(user.password, 10);
        const { password, ...newData } = {
            ...user,
            password_hash: passHash,
            refreshToken: refreshToken,
        };
        const prismaData = newData as PrismaRegisterSchema;
        let resp: NextResponse;
        try {
            await main(prismaData);
            await prisma.$disconnect();
            resp = NextResponse.json({
                status: 1,
                data: { accessToken: accessToken, refreshToken: refreshToken },
            });
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
