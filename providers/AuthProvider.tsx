"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import useJWT from "@/hooks/useJWT";
import useLocalStorage from "@/hooks/useLocalStorage";
import { UserService } from "@/services/user.service";
import { UserEntity } from "@/entities/UserEntity";

export type AuthContent = {
    readonly user?: UserEntity;
    readonly accessToken?: string;
    readonly refreshToken?: string;
    login: (login: string, password: string) => Promise<void>;
    logOut: () => void;
    refresh: () => void;
};

export const AuthContext = createContext<AuthContent>({
    login: () => new Promise(() => undefined),
    logOut: () => undefined,
    refresh: () => undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserEntity | undefined>(undefined);
    const [accessToken, setAccessToken] = useLocalStorage("accessToken");
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
    const { decodeJWT } = useJWT<UserEntity>();

    useEffect(() => {
        const process = async () => {
            if (accessToken && refreshToken) {
                const val = await decodeJWT(accessToken);
                if (!val.expired) {
                    const usr: UserEntity = { name: val.decoded.name, img: val.decoded.img };
                    setUser(usr);
                } else if (val.expired && refreshToken) {
                    refresh(refreshToken);
                }
            }
        };
        process();
    }, []);

    const login = async (login: string, password: string) => {
        const val = await UserService.login(login, password);
        if (val.status == "1") {
            setAccessToken(val.data.accessToken);
            setRefreshToken(val.data.refreshToken);
        } else if (val.status == "-1") {
            throw Error(val.message);
        }
    };

    const logOut = () => {
        setUser(undefined);
        setAccessToken(undefined);
        setRefreshToken(undefined);
    };

    const refresh = async (token?: string) => {
        if (token) {
            const val = await UserService.refresh(token);
            if (val.status == "1") {
                const data = val.data;
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
            } else {
                console.log(val);
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: user,
                accessToken: accessToken,
                refreshToken: refreshToken,
                login: login,
                logOut: logOut,
                refresh: () => refresh(refreshToken),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
