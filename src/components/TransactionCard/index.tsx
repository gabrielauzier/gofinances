import React from "react";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface Category {
  key: string;
  name: string;
  icon: string;
}

export interface Transaction {
  type: "income" | "outcome";
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export interface TransactionCardProps {
  data: Transaction;
}

export function TransactionCard({ data }: TransactionCardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} size={20} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
