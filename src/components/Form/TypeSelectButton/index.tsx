import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  type: "income" | "outcome";
  isSelected: boolean;
}

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

export function TypeSelectButton({ type, isSelected, ...rest }: Props) {
  return (
    <Container
      activeOpacity={0.7}
      {...rest}
      isSelected={isSelected}
      type={type}
    >
      <Icon name={icons[type]} size={24} type={type} />
      <Title>{type === "income" ? "Entrada" : "Saída"}</Title>
    </Container>
  );
}
