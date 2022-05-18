import styled from "styled-components/native";

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

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 24px;
`;
export const Fields = styled.View``;

export const TypeSelector = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
