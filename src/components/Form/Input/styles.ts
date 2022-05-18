import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";

export const Container = styled(TextInput)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 18px 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
`;
