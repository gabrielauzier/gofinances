import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { FlatList, FlatListProps } from "react-native";
import { DataListProps } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: 300px;

  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 24px;
`;

export const UserWrapper = styled.View`
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 18px;
  border-radius: 5px;
`;

export const User = styled.View``;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: 144px;
`;

export const TransactionsWrapper = styled.View`
  flex: 1;
  margin-top: 54px;
  padding: 24px 24px 0px 24px;
`;

export const TransactionsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
)``;
