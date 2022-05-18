import React from "react";
import { Container, CategoryName, Icon } from "./styles";

interface Props {
  category: string;
  onCategoryModalOpen: () => void;
}

export default function CategorySelectButton({
  category,
  onCategoryModalOpen,
}: Props) {
  return (
    <Container activeOpacity={0.7} onPress={onCategoryModalOpen}>
      <CategoryName>{category}</CategoryName>
      <Icon name="keyboard-arrow-down" size={20} />
    </Container>
  );
}
