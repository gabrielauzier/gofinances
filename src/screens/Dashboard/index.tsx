import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { Transaction, TransactionCard } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  TransactionsWrapper,
  TransactionsTitle,
  TransactionsList,
} from "./styles";

export interface DataListProps extends Transaction {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "income",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000",
      category: {
        key: "sales",
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2022",
    },
    {
      id: "2",
      type: "outcome",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59",
      category: {
        key: "food",
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2022",
    },
    {
      id: "3",
      title: "Aluguel do apartamento",
      type: "outcome",
      amount: "R$ 1.200",
      category: {
        key: "home",
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "12/03/2022",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/63938494?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gabriel</UserName>
            </User>
          </UserInfo>
          <Icon name="power" size={24} />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="income"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="outcome"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 16 de abril"
        />
      </HighlightCards>

      <TransactionsWrapper>
        <TransactionsTitle>Transações</TransactionsTitle>
        <TransactionsList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item} key={item.title} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </TransactionsWrapper>
    </Container>
  );
}
