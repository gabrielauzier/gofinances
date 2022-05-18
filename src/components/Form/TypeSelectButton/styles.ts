import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface IconProps {
  type: "income" | "outcome";
}

interface ContainerProps {
  type: "income" | "outcome";
  isSelected: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-direction: row;

  /* border: ${({ isSelected }) => (isSelected ? 0 : 1.5)}px; */
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.text};

  align-items: center;
  justify-content: center;
  width: 48%;
  padding: 18px;
  margin: 8px 0px;

  ${({ type, isSelected }) =>
    type === "income" &&
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
  ${({ type, isSelected }) =>
    type === "outcome" &&
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 14px;

  color: ${({ type, theme }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  padding-bottom: 0px;
`;
