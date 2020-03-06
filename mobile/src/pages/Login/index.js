import React, { useState } from "react";
import { View, StatusBar, Alert } from "react-native";
import { Container, Content, Title, Card, Button, ButtonText } from "./styles";
import { Hoshi } from "react-native-textinput-effects";
import UserService from "../../services/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    let body = {
      email
    };
    // console.warn('response login', response);

    try {
      let user = await UserService.login(body);
      props.navigation.navigate("TabScreen");
      // console.warn(user);
    } catch (e) {
      Alert.alert("Informação", JSON.stringify(e.response));
      // console.warn('err?',e.response);
      if (e.response.status == 404) {
        Alert.alert("Informação", "Usuário não encontrado");
      }
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#4AC0EF" />
      <Content>
        <Card>
          <Title>Login</Title>
          <View style={{ height: 20 }} />
          <Hoshi
            label={"Email"}
            value={email}
            onChangeText={value => setEmail(value)}
            labelStyle={{ color: "#4AC0EF" }}
            // this is used as active border color
            borderColor={"#4AC0EF"}
            // active border height
            borderHeight={1.5}
            inputPadding={16}
            autoCapitalize={"characters"}
            autoCorrect={false}
            autoCompleteType={"email"}
            // this is used to set backgroundColor of label mask.
            // please pass the backgroundColor of your TextInput container.
            // backgroundColor={'#F9F7F6'}
          />
          <Button
            activeOpacity={0.5}
            onPress={() => {
              handleSubmit();
            }}
          >
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Card>
      </Content>
    </Container>
  );
}
