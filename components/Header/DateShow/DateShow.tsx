"use client";

import H1 from "@/components/Ui/H1";
import { useDate } from "@/hooks/useDate";
import { FC } from "react";

const DateShow: FC = () => {
    const { date } = useDate();
    return (
        <div style={{ width: "max-content" }}>
            {date ? (
                <H1>{`${date.year ?? ""}, ${date.month ?? ""}, ${date.day ?? ""}`}</H1>
            ) : (
                <H1>Select date</H1>
            )}
        </div>
    );
};

export default DateShow;
