import React from "react";
import { categories } from "../../utils/categories";

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
  category: string;
  date: Date;
}

export interface TransactionCardProps {
  data: Transaction;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} size={20} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
