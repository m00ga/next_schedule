"use client";

import { useTheme } from "@/hooks/useTheme";
import { styled } from "styled-components";
import { ThemeEntity } from "@/entities/ThemeEntity";
import { useFormContext } from "react-hook-form";

const StyledInput = styled.div<{ $theme?: ThemeEntity }>`
  display: grid;
  grid-auto-flow: row;

  & label {
    margin-bottom: 5px;
  }

  & input {
    padding: 5px 2px;
    font-size: 18px;
    border-radius: 6px;
    outline: none;
    border: 1px solid ${({ $theme }) => $theme?.border};
  }
  & input:focus {
    border: 1px solid ${({ $theme }) => $theme?.primary};
  }
  & p {
    color: red;
    margin-top: 5px;
  }
`;

const TextField = ({
  name,
  label,
  placeholder,
  controled,
  className,
}: {
  name: string;
  label: string;
  placeholder?: string;
  controled?: boolean;
  className?: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() ?? {
    register: () => undefined,
    formState: { errors: undefined },
  };
  let passProps = {};
  if (controled) {
    passProps = register(name);
  }
  const { theme } = useTheme();
  return (
    <StyledInput $theme={theme} className={className}>
      <label htmlFor={name}>{label}</label>
      <input type="text" {...passProps} placeholder={placeholder}></input>
      {controled && errors?.[name] && (
        <p>{errors?.[name]?.message?.toString()}</p>
      )}
    </StyledInput>
  );
};

export default TextField;
