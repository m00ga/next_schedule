import * as jose from "jose";

const secret = new TextEncoder().encode("12345");
const alg = "HS256";

const useJWT = <T extends jose.JWTPayload>() => {
    const decodeJWT = async (token: string) => {
        let payload = {};
        let expired = false;
        const valid = {
            signature: true,
            token: true,
        };
        try {
            const methods = await jose.jwtVerify(token, secret);
            payload = methods.payload;
        } catch (e: unknown) {
            if (e instanceof jose.errors.JWSInvalid) {
                valid.token = false;
            }
            if (e instanceof jose.errors.JWSSignatureVerificationFailed) {
                valid.signature = false;
            }
            if (e instanceof jose.errors.JWTExpired) {
                expired = true;
            }
        }
        return { decoded: payload as T, expired: expired, valid: valid };
    };

    const encodeJWT = async (data: object, expiration: string) => {
        const token = await new jose.SignJWT(data as jose.JWTPayload)
            .setProtectedHeader({ alg })
            .setExpirationTime(expiration)
            .sign(secret);
        return token;
    };

    const generateKeychain = async (data: T) => {
        const accessToken = await encodeJWT(data, "1h");
        const refreshToken = await encodeJWT({}, "30d");

        return { accessToken: accessToken, refreshToken: refreshToken };
    };

    return { decodeJWT, encodeJWT, generateKeychain };
};

export default useJWT;
