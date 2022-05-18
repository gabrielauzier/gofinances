import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

interface CategoryNameProps {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 18px 16px;
  border-radius: 5px;
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CategoryName = styled.Text<CategoryNameProps>`
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text_dark : theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.text};
`;
