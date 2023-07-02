"use client";

import { ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { styled } from "styled-components";
import { ThemeEntity } from "@/entities/ThemeEntity";

const StyledButton = styled.button<{ $theme?: ThemeEntity }>`
  display: block;
  color: #000;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  border: 1px solid ${({ $theme }) => $theme?.border};
  border-radius: 6px;
  outline: none;
  &:hover {
    background-color: ${({ $theme }) => $theme?.primary};
    color: #fff;
  }
`;

const Button = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: (e: unknown) => void;
}) => {
  const { theme } = useTheme();
  return (
    <StyledButton $theme={theme} onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
};

export default Button;
