import { FlatList } from "react-native";
import React from "react";
import { categories } from "../../utils/categories";
import {
  Category,
  CategoryName,
  Container,
  Footer,
  Header,
  Icon,
  Separator,
  Title,
} from "./styles";
import { Button } from "../../components/Form/Button";

interface Category {
  key: string;
  name: string;
  icon: string;
}

interface Props {
  categorySelected: Category;
  onChooseCategory: (category: Category) => void;
  onCategoryModalClose: () => void;
}

export default function CategorySelectorModal({
  categorySelected,
  onChooseCategory,
  onCategoryModalClose,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => onChooseCategory(item)}
            isSelected={categorySelected.key === item.key}
          >
            <Icon name={item.icon} size={16} />
            <CategoryName>{item.name}</CategoryName>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={onCategoryModalClose} />
      </Footer>
    </Container>
  );
}
