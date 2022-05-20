import React, { useEffect, useState } from "react";

import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Container, Header, Title, Form, Fields, TypeSelector } from "./styles";
import { TypeSelectButton } from "../../components/Form/TypeSelectButton";
import { Button } from "../../components/Form/Button";

import CategorySelectButton from "../../components/Form/CategorySelectButton";
import CategorySelectorModal from "../CategorySelectorModal";

import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { Dashboard } from "../Dashboard";
import { NavigationProps } from "../../utils/navigation";

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

const collectionKey = "@gofinances:transactions";

export function Register() {
  const navigation = useNavigation<NavigationProps>();
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
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function toogleIsCategoryModalOpen() {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  }

  function clearFields() {
    setTransactionType("");
    setCategory({
      key: "category",
      name: "Categoria",
      icon: "any",
    });
    reset();
  }

  async function handleRegister(form: Partial<FormData>) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    if (!form.amount || !form.name) return;

    const newTransaction = {
      id: String(uuid.v4()),
      title: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const currentTransaction = data ? JSON.parse(data) : [];

      const dataFormatted = [newTransaction, ...currentTransaction];

      await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted));

      clearFields();
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar a transação.");
    }
  }

  async function removeAll() {
    await AsyncStorage.removeItem(collectionKey);
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
          <Button title="Deletar Transações" onPress={removeAll} />
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
