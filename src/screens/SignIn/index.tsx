import React, { useState } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  Subtitle,
  Footer,
  Buttons,
} from "./styles";

import LogoSvg from "../../assets/logo.svg";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { SocialSignInButton } from "../../components/SocialSignInButton";

import { useTheme } from "styled-components";

export function SignIn() {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const { signInWithGoogle } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoadingUser(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoadingUser(false);
    }
  }

  return (
    <Container>
      <Header>
        <LogoSvg />
        <TitleWrapper>
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
          <Subtitle>Faça seu login com {"\n"} uma das contas abaixo</Subtitle>
        </TitleWrapper>
      </Header>
      <Footer>
        <Buttons>
          <SocialSignInButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />
          {Platform.OS === "ios" && (
            <SocialSignInButton svg={AppleSvg} title="Entrar com Apple" />
          )}
        </Buttons>

        {isLoadingUser && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
