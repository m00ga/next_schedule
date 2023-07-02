"use client";

import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { styled } from "styled-components";
import { ThemeEntity } from "@/entities/ThemeEntity";

const StyledH1 = styled.h1<{ $theme?: ThemeEntity }>`
  color: ${({ $theme }) => $theme?.foreground};
  font-size: clamp(1rem, 2vw, 3rem);
  padding: 0;
  margin: 0;
`;

const H1 = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    return <StyledH1 $theme={theme}>{children}</StyledH1>;
};

export default H1;
