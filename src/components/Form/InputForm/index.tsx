import React from "react";

import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Container, Error } from "./styles";
import { Input } from "../Input";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      {error && <Error>{error}</Error>}
      <Controller
        control={control} // what form is controlling this input
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      ></Controller>
    </Container>
  );
}
