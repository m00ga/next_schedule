"use client";

import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import styles from "./UserPanel.module.css";
import Image from "next/image";
import { Dropdown, DropdownOption } from "@/components/Ui/Dropdown/Dropdown";
import { styled } from "styled-components";

const CustomDropdown = styled(Dropdown)`
  justify-self: end;
`;

const UserPanel: FC = () => {
    const options: DropdownOption[] = [
        {
            text: "Poiti naxui",
            onClick: () => undefined,
        },
        {
            text: "Logout",
            onClick: () => undefined,
        },
    ];

    return (
        <CustomDropdown options={options}>
            <div className={styles.container}>
                <div className={styles.img}>
                    <Image
                        src="/owl.jpg"
                        fill
                        alt="No image"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <span className={styles.name}>Test</span>
            </div>
        </CustomDropdown>
    );
};

export default UserPanel;
