import React from "react";
import { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { Container, IconWrapper, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SocialSignInButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} {...rest}>
      <IconWrapper>
        <Svg />
      </IconWrapper>
      <Title>{title}</Title>
    </Container>
  );
}
