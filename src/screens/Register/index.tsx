import React, { useState } from "react";

import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { Modal } from "react-native";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TypeSelectButton } from "../../components/Form/TypeSelectButton";
import { Container, Header, Title, Form, Fields, TypeSelector } from "./styles";
import CategorySelectorModal from "../CategorySelectorModal";

export function Register() {
  const [typeSelected, setTypeSelected] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    setTypeSelected(type);
  }

  function toogleIsCategoryModalOpen() {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TypeSelector>
            <TypeSelectButton
              type="income"
              isSelected={typeSelected === "income"}
              onPress={() => handleTransactionTypeSelect("income")}
            />
            <TypeSelectButton
              type="outcome"
              isSelected={typeSelected === "outcome"}
              onPress={() => handleTransactionTypeSelect("outcome")}
            />
          </TypeSelector>
          <CategorySelectButton
            category={category.name}
            onCategoryModalOpen={toogleIsCategoryModalOpen}
          />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={isCategoryModalOpen} statusBarTranslucent>
        <CategorySelectorModal
          categorySelected={category}
          onChooseCategory={setCategory}
          onCategoryModalClose={toogleIsCategoryModalOpen}
        />
      </Modal>
    </Container>
  );
}
