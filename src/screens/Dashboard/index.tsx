import React, { useCallback, useEffect, useState } from "react";
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
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends Transaction {
  id: string;
}

interface HighlightProps {
  total: string;
  lastTransaction: string;
}

interface HighlightData {
  incomes: HighlightProps;
  outcomes: HighlightProps;
  balance: HighlightProps;
}

const collectionKey = "@gofinances:transactions";

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "income" | "outcome"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(collectionKey);
    const transactions = response ? JSON.parse(response) : [];

    let incomesTotal = 0;
    let outcomesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "income") incomesTotal += Number(item.amount);
        else outcomesTotal += Number(item.amount);

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          category: item.category,
          title: item.title,
          type: item.type,
          id: item.id,
          amount,
          date,
        };
      }
    );

    const lastIncomeTransactionDate = getLastTransactionDate(
      transactions,
      "income"
    );
    const lastOutcomeTransactionDate = getLastTransactionDate(
      transactions,
      "outcome"
    );
    const totalDateInterval = `01 a ${lastOutcomeTransactionDate}`;

    const total = incomesTotal - outcomesTotal;

    setHighlightData({
      incomes: {
        total: incomesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastIncomeTransactionDate}`,
      },
      outcomes: {
        total: outcomesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastOutcomeTransactionDate}`,
      },
      balance: {
        total: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalDateInterval,
      },
    });

    setTransactions(transactionsFormatted);

    setIsLoadingData(false);
    console.log(transactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoadingData ? (
        <ActivityIndicator />
      ) : (
        <>
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
              amount={highlightData.incomes.total}
              lastTransaction={highlightData.incomes.lastTransaction}
            />
            <HighlightCard
              type="outcome"
              title="Saídas"
              amount={highlightData.outcomes.total}
              lastTransaction={highlightData.outcomes.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.balance.total}
              lastTransaction={highlightData.balance.lastTransaction}
            />
          </HighlightCards>

          <TransactionsWrapper>
            <TransactionsTitle>Transações</TransactionsTitle>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard data={item} key={item.title} />
              )}
              showsVerticalScrollIndicator={false}
            />
          </TransactionsWrapper>
        </>
      )}
    </Container>
  );
}
