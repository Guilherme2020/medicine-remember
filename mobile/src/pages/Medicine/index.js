import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Container, List } from './styles';
import Card from '../../components/Card/index';
import api from '../../services/api';
import moment from "moment";

export default function Medicine() {
  const [medicineList, setMedicine] = useState([]);

  useEffect(() => {

    const loadList = async () => {
      api.get('/medicine')
        .then((response) => {
          // console.warn(response)
          setMedicine(response.data)
        })
    }
    getHour();
    loadList();
  }, [])

  useEffect(() => {

    const verify = () => {

      const date = new Date();

      const hour = new Date();

      const search = medicineList.map((i) => {

        if (formatBrDate(i.date) === formatBrDate(date) && formatHour(i.hour) === formatHour(hour)) {
          console.warn("teste");

        }

      })
      if(search){

        console.warn('enter');

      }
    }
    verify();


  });

  const formatBrDate = (dateParams) => {

    const formateDate = moment(dateParams).format('DD/MM/YYYY');
    return formateDate;

  }
  const formatHour = (hourParams) => {

    const formatHour = moment(hourParams).format("HH:mm");
    return formatHour;

  }

  const getHour = () => {

    const hour = new Date();

    const hourFormat = moment(hour).format("HH:mm");

    console.warn(hourFormat);

  }



  const renderItem = ({ item }) =>
    <Card
      data={item}
      key={item._id}
      name={item.name}
      description={item.description}
      date={formatBrDate(item.date)}
      hour={item.hour}
    />

  return (
    <Container>

      <List
        data={medicineList}
        renderItem={renderItem}
        keyExtractor={(item) => String(item._id)}
      />
      <View style={{ height: 20 }} />
    </Container>
  );
}
