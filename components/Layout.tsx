import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Header from "./Header/Header";
import { DateProvider } from "@/providers/DateProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <DateProvider>
                    <Toaster />
                    <Header />
                    <main>{children}</main>
                </DateProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default Layout;
