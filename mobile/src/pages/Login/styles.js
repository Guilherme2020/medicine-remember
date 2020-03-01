import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items:center;
  justify-content: center;
  background: #4AC0EF;
`;

export const Content = styled.View`
  width: 310px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;
  color: #4AC0EF;
  text-align:center;
`;

export const Card = styled.View`
   background: #fff;
   border-radius: 10px;
   padding: 30px;
   shadow-color: #c0c0c0;
   elevation: 6;
   padding: 20px;
`;
export const Button = styled.TouchableOpacity`
  background: #4AC0EF;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
  shadow-color: #4AC0EF;
  elevation: 2;
  padding: 6px;

  ${props => {props.onPress}}
  ${props => props.activeOpacity}
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`

export const BodyContent = styled.Text`
  border-bottom-width: 1.5px;
`

