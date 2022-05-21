import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 90px;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
  padding: 45px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 30px;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  text-align: center;
  margin-top: 30px;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 100%;
`;

export const Buttons = styled.View`
  padding: 0 32px;
  margin-top: -12px;
`;
