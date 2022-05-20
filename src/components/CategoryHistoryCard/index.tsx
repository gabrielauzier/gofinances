import React from "react";
import { Amount, Container, Title } from "./styles";

interface Props {
  color: string;
  title: string;
  amount: string;
}

export function CategoryHistoryCard({ color, title, amount }: Props) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
