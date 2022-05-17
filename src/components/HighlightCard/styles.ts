import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { ProgressViewIOSComponent } from "react-native";

interface TypeProps {
  type: "income" | "outcome" | "total";
}

export const Container = styled.View<TypeProps>`
  background-color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.secondary
      : props.theme.colors.shape};
  padding: 18px 22px;
  border-radius: 5px;
  width: 300px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;

  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
`;

export const Icon = styled(Feather)<TypeProps>`
  color: ${({ theme }) => theme.colors.success};

  ${(props) =>
    props.type === "income" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
  ${(props) =>
    props.type === "outcome" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
        ${(props) =>
    props.type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View`
  margin-top: 50px;
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 32px;

  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.title};
`;
