import React, { useState, useEffect } from 'react';
import { Container,List } from './styles';
import Card from '../../components/Card/index';
import api from '../../services/api';
import moment from "moment";

export default function Medicine() {
  const [medicineList, setMedicine] = useState([]);

  useEffect(() => {

    const loadList =  async () => {
      api.get('/medicine')
          .then((response) => {
            // console.warn(response)
            setMedicine(response.data)
          })
    }
    getHour();
    loadList();
  }, [])

  const formatBrDate = (dateParams) => {

    const formateDate =  moment(dateParams).format('DD/MM/YYYY');
    return formateDate;

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
    </Container>
  );
}
