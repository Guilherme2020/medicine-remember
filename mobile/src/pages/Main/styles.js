import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
`;

export const Section = styled.View`
  background: #4ac0ef;
  width: 100%;
  height: 320px;
  align-items: center;
  justify-content: center;
`;

export const SectionContent = styled.View`
  display: flex;
  /* background: blue; */
  width: 200px;
  height: 150px;

  align-items: center;
  justify-content: center;
`;

export const SectionInfo = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const InfoText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: black;
`;
