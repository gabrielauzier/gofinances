import React, { useState } from "react";

import CategorySelectButton from "../../components/Form/CategorySelectButton";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TypeSelectButton } from "../../components/Form/TypeSelectButton";
import { Container, Header, Title, Form, Fields, TypeSelector } from "./styles";
import CategorySelectorModal from "../CategorySelectorModal";

import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é um campo obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O valor é um campo obrigatório")
    .positive("O valor não pode ser negativo"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function toogleIsCategoryModalOpen() {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  }

  function handleRegister(form: Partial<FormData>) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TypeSelector>
              <TypeSelectButton
                type="income"
                isSelected={transactionType === "income"}
                onPress={() => handleTransactionTypeSelect("income")}
              />
              <TypeSelectButton
                type="outcome"
                isSelected={transactionType === "outcome"}
                onPress={() => handleTransactionTypeSelect("outcome")}
              />
            </TypeSelector>
            <CategorySelectButton
              category={category.name}
              onCategoryModalOpen={toogleIsCategoryModalOpen}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={isCategoryModalOpen} statusBarTranslucent>
          <CategorySelectorModal
            categorySelected={category}
            onChooseCategory={setCategory}
            onCategoryModalClose={toogleIsCategoryModalOpen}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
