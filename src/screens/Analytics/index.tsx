import React, { useCallback, useEffect, useState } from "react";
import { CategoryHistoryCard } from "../../components/CategoryHistoryCard";
import { Container, Header, Title, History } from "./styles";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

interface CategoryData {
  name: string;
  amount: number;
  amountFormatted: string;
  color: string;
  key: string;
  percent: string;
}

export function Analytics() {
  const { user } = useAuth();
  const collectionKey = `@gofinances:transactions_user:${user.id}`;

  const theme = useTheme();
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    const dataToSet: CategoryData[] = [];

    const outcomes = responseFormatted.filter(
      (transaction: Transaction) => transaction.type === "outcome"
    );

    const outcomesTotal = outcomes.reduce(
      (accumulator: number, outcome: Transaction) => {
        return accumulator + Number(outcome.amount);
      },
      0
    );

    categories.forEach((category) => {
      let categoryTotal = 0;

      outcomes.forEach((outcome: Transaction) => {
        if (outcome.category === category.key)
          categoryTotal += Number(outcome.amount);
      });

      if (categoryTotal > 0) {
        const total = categoryTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categoryTotal / outcomesTotal) * 100).toFixed(
          0
        )}%`;

        dataToSet.push({
          amountFormatted: total,
          amount: categoryTotal,
          color: category.color,
          name: category.name,
          key: category.key,
          percent,
        });
      }
    });

    setTotalByCategory(dataToSet);
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Gastos por Categoria</Title>
      </Header>
      <VictoryPie
        data={totalByCategory}
        colorScale={totalByCategory.map((category) => category.color)}
        innerRadius={0}
        style={{
          labels: {
            fontSize: 18,
            fontFamily: theme.fonts.regular,
            fill: theme.colors.shape,
            fontWeight: "bold",
          },
        }}
        labelRadius={70}
        x="percent"
        y="amount"
      />
      <History>
        {totalByCategory.map((category) => (
          <CategoryHistoryCard
            amount={category.amountFormatted}
            color={category.color}
            title={category.name}
            key={category.key}
          />
        ))}
      </History>
    </Container>
  );
}
