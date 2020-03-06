import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  flex: 1;
  background-color: #fff;
`;

export const ModalContainer = styled.View`
  background: #ffffff;
  padding: 20px;
  flex: 0.4;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: auto;
`;

export const ModalContent = styled.View`
  align-items: center;
  width: 100%;
`;

export const ModalTitleContent = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ModalDescription = styled.View`
  margin-top: 10px;
  width: 100%;
`;
export const ModalTextDescription = styled.Text`
  text-align: left;
  font-size: 16px;
`;
export const ModalContainerButton = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;
export const ModalButton = styled.TouchableOpacity`
  background: #4ac0ef;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
  shadow-color: #4ac0ef;
  elevation: 2;
  padding: 10px;

  ${props => {
    props.onPress;
  }}
  ${props => props.activeOpacity}
`;

export const ModalButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
