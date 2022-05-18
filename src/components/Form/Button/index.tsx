import { View, Text, TouchableOpacityProps } from "react-native";
import React from "react";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
