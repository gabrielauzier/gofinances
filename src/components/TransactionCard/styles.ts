import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  type: "income" | "outcome";
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 18px 24px;
  margin-bottom: 16px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`;

export const Amount = styled.Text<TypeProps>`
  color: ${({ type, theme }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 20px;
  margin-top: 2px;
`;

export const Footer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  margin-left: 18px;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`;
