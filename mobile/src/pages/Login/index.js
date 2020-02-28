import React, { useState } from 'react';
import { View, StatusBar,  } from 'react-native';
import { Container, Content, Title, Card, Button, ButtonText, BodyContent } from './styles';
import AnimatedInput from 'react-native-animated-input';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    console.warn(email);
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#4AC0EF" />
      <Content>
        <Card>
          <Title>
            Login
          </Title>
          <View style={{height: 20}} />
          <Hoshi
              label={'Email'}
              value={email}
              onChangeText={(value) => setEmail(value) }
              labelStyle={{color: '#4AC0EF'}}
              // this is used as active border color
              borderColor={'#4AC0EF'}

              // active border height
              borderHeight={1.5}
              inputPadding={16}
              autoCapitalize={'characters'}
              autoCorrect={false}
              autoCompleteType={'email'}
              // this is used to set backgroundColor of label mask.
              // please pass the backgroundColor of your TextInput container.
              // backgroundColor={'#F9F7F6'}
          />
          <Button activeOpacity={0.5} onPress={() => handleSubmit()}>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Card>
      </Content>
    </Container>
  );
}

