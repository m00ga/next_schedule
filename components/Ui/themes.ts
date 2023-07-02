import { ThemeEntity } from "@/entities/ThemeEntity";

export const LightTheme: ThemeEntity = {
    background: "#fff",
    foreground: "#000000",
    primary: "#5168d2",
    border: "#bcbcbc",
};

export const DarkTheme: ThemeEntity = {
    background: "#000000",
    foreground: "#fff",
    primary: "#5168d2",
    border: "#bcbcbc",
};

export const DefaultTheme: ThemeEntity = LightTheme;
