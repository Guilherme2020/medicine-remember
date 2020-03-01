import styled from 'styled-components';

export const Container = styled.View`

  flex: 1;
  align-items: center;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #FFF;
`;
