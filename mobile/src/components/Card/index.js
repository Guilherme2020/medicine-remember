import React from 'react';
import {Text, TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Description, DateRemedy, Title,
} from './styles';

const Card = (props) => (

  <Container>
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <Header>
        <Title> {props.name}</Title>
      </Header>

      <Content>
        <DateRemedy>
          <Title> Data: {props.date}</Title>
        </DateRemedy>
      </Content>
      <Content>
        <DateRemedy>
          <Title> Horário de uso: {props.hour} hr</Title>
        </DateRemedy>
      </Content>
      <Content>
        <Description> Descrição: {props.description}</Description>
      </Content>
    </TouchableOpacity>

  </Container>
);

export default Card;
