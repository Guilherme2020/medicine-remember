import React, { useState, useEffect } from "react";
import { AsyncStorage, Image } from "react-native";
import {
  Container,
  Section,
  SectionContent,
  SectionInfo,
  InfoText
} from "./styles";

export default function Main() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const user = await AsyncStorage.getItem("user");

      setUser(JSON.parse(user));
    };
    loadData();
  }, []);

  return (
    <Container>
      <Section>
        <SectionContent>
          <Image
            style={{ width: 150, height: 150, borderRadius: 100 }}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKamVD-ZpDVThP5QG9dx6QDSHdeiulTW1_8NKQkV5bwpsHu9PQ"
            }}
          />
        </SectionContent>
      </Section>

      <SectionInfo>
        <InfoText>Bem vindo(a){user && user.name}</InfoText>
      </SectionInfo>
    </Container>
  );
}
