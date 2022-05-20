import styled from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 12px 24px;
  border-radius: 5px;
  border-left-color: ${({ color }) => color};
  border-left-width: 4px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 15px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 15px;
`;
