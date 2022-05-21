import React from "react";
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
import { SocialSignInButton } from "../../components/SocialSignInButton";

export function SignIn() {
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
          <SocialSignInButton svg={GoogleSvg} title="Entrar com Google" />
          <SocialSignInButton svg={AppleSvg} title="Entrar com Apple" />
        </Buttons>
      </Footer>
    </Container>
  );
}
