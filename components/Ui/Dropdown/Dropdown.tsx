import { ThemeEntity } from "@/entities/ThemeEntity";
import { useTheme } from "@/hooks/useTheme";
import { ReactNode, useState } from "react";
import { styled } from "styled-components";

export type DropdownOption = {
  text: string;
  onClick: (e: unknown) => void;
};

const Container = styled.div`
  display: inline-block;
  grid-auto-flow: row;
  width: max-content;
  position: relative;
`;

const ContentContainer = styled.div<{ $opened?: boolean }>`
  cursor: pointer;
  position: relative;
  display: grid;
  align-items: center;
  padding: 0.75em;
  column-gap: 3em;
  grid-auto-flow: column;
  border: 1px solid #bcbcbc;
  border-radius: ${({ $opened }) => ($opened ? "8px 8px 0 0" : "8px")};
  ${({ $opened }) => ($opened ? "border-bottom: 0;" : "")}
`;

const Arrow = styled.i<{ $opened?: boolean }>`
  position: relative;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  transform: rotate(45deg);
  justify-self: end;
  margin-${({ $opened }) => (!$opened ? "bottom" : "top")}: 5px;

  transition: 0.3s transform ease-in-out;
  ${({ $opened }) => $opened && "transform: rotate(-135deg);"}
`;

const OptionsContainer = styled.ul<{ $theme?: ThemeEntity }>`
  margin: 0;
  list-style-type: none;
  padding: 0;
  position: absolute;
  z-index: 1;
  width: 100%;

  & li {
    border: 1px solid ${({ $theme }) => $theme?.border};
    cursor: pointer;
    text-align: center;
    padding: 0.75em 0;
    transition: 0.3s all ease-in-out;
  }

  & li:not(:last-child) {
    border-bottom: none;
  }

  & li:hover {
    color: #fff;
    background-color: ${({ $theme }) => $theme?.primary};
  }

  & li:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const Dropdown = ({
  children,
  options,
  className,
}: {
  children: ReactNode;
  options: Array<DropdownOption>;
  className?: string;
}) => {
  const { theme } = useTheme();
  const [opened, setOpened] = useState(false);

  const handleOpened = () => {
    setOpened((prev: boolean) => !prev);
  };

  return (
    <Container className={className}>
      <ContentContainer onClick={handleOpened} $opened={opened}>
        {children}
        <Arrow $opened={opened} />
      </ContentContainer>
      {opened && <OptionsContainer $theme={theme}>
        {options.map((value, index) => {
          return (
            <li key={index} onClick={value.onClick}>
              {value.text}
            </li>
          );
        })}
      </OptionsContainer>}
    </Container>
  );
};
