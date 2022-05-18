import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 18px;
  align-items: center;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
`;
