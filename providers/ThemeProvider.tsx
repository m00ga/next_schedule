"use client";

import { ReactNode, createContext, useState } from "react";
import { DefaultTheme } from "@/components/Ui/themes";
import { ThemeEntity } from "@/entities/ThemeEntity";


export type ThemeContent = {
    theme?: ThemeEntity;
    setTheme: (theme: ThemeEntity) => void;
};

export const ThemeContext = createContext<ThemeContent>({
    theme: undefined,
    setTheme: () => undefined,
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ThemeEntity>(DefaultTheme);
    return (
        <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
