import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface CategoryProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<CategoryProps>`
  padding: 18px 16px;
  flex-direction: row;
  align-items: center;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text_dark};
  margin-right: 16px;
  width: 20px;
  height: 22px;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  margin: 24px;
`;
