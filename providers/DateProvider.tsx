"use client";

import { ReactNode, createContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DateEntity } from "@/entities/DateEntity";

type DateContent = {
    date?: DateEntity;
    setDate: (date: Date) => void;
};

export const DateContext = createContext<DateContent>({
    setDate: () => undefined,
});

export const DateProvider = ({ children }: { children: ReactNode }) => {
    const [date, setDate] = useLocalStorage<DateEntity>("date");

    const setNewDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.toLocaleString("us", { month: "long" });
        const month_num = date.getMonth();
        const day = date.getDate();
        setDate({ year: year, month: month, day: day, month_num: month_num });
    };

    return (
        <DateContext.Provider value={{ date: date, setDate: setNewDate }}>
            {children}
        </DateContext.Provider>
    );
};
