import { NextResponse } from "next/server";
import useJWT from "@/hooks/useJWT";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(
    token: string,
    encodeJWT: (data: object, exp: string) => Promise<string>
) {
    const user = await prisma.user.findUnique({
        where: {
            refreshToken: token,
        },
    });
    if (user === null) {
        throw new Error("Wrong token");
    }
    const accessToken = await encodeJWT(
        { login: user.login, name: user.name, img: user.image },
        "1h"
    );
    const refreshToken = await encodeJWT(
        { login: user.login, name: user.name, img: user.image },
        "30d"
    );
    await prisma.user.update({
        where: { refreshToken: token },
        data: { refreshToken: refreshToken },
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
}

const createError = (message: string) =>
    NextResponse.json({ status: -1, message: message });

export async function GET(req: Request) {
    const splited = req.url.split("?");
    if (splited.length < 2) {
        return createError("Provide token to refresh");
    }
    const params = new URLSearchParams(splited[1]);
    const token = params.get("token");
    if (token === null) {
        return createError("Provide token to refresh");
    }
    const { decodeJWT, encodeJWT } = useJWT();
    const { decoded, expired, valid } = await decodeJWT(token);
    if (!valid.token) {
        return createError("Invalid token provided");
    } else if (!valid.signature) {
        return createError("Invalid token signature");
    }
    if (expired) {
        return createError("Token expired");
    }
    try {
        const keychain = await main(token, encodeJWT);
        await prisma.$disconnect();
        return NextResponse.json({ status: 1, data: { ...keychain } });
    } catch (e: unknown) {
        await prisma.$disconnect();
        return createError(e.message);
    } finally {
        await prisma.$disconnect();
    }
}
