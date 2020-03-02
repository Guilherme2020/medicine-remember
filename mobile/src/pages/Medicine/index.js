import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { Container, List } from './styles';
import Card from '../../components/Card/index';
import api from '../../services/api';
import moment from "moment";
import Sound from 'react-native-sound';
import Modal from "react-native-modal";

const alert = require('../../../android/assets/sounds/alert.wav');


export default function Medicine() {
  const [medicineList, setMedicine] = useState([]);
  const [isHour, setIshour] = useState(false);
  const [al, setAlert] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cancelAlarm, setCancelAlarm] = useState(false);

  const useInterval = (callback, delay) => {

    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);

  };
  const toggleModal = () => {

    setIsModalVisible(false);
    setIshour(false);
    setCancelAlarm(true);
    al.stop();

  };

  const renderModal = () => {

    if (isModalVisible) {

      return (

        <Modal isVisible={isModalVisible}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            height: 'auto',
          }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <View style={{width: '100%',marginTop: 10}}>

                <Text style={{fontSize: 18,fontWeight:'bold',textAlign:'center'}}>Descrição</Text>
              </View>
              <View style={{ marginTop: 10, width: '100%' }}>
                <Text style={{ textAlign: 'left' }}>
                  Nome do remédio: Bezetazil
                </Text>
              </View>
              <View style={{ marginTop: 10,  width: '100%' }}>
                <Text style={{ textAlign: 'left' }}>
                  Descrição: Dose diária
                </Text>
              </View>
              <View style={{ marginTop: 10, width: '100%' }}>
                <Text style={{ textAlign: 'left' }}>
                  Horário de uso: 16hrs
                </Text>
              </View>
              <View style={{ marginTop: '15%', background: 'red' }}>
                <Button title="Desligar Alarme" onPress={() => toggleModal()} />
              </View>

            </View>
          </View>
        </Modal >
      );

    }

  }
  useInterval(() => {

    const date = new Date();

    const hour = new Date();
    // setCancelAlarm()
    medicineList.forEach((element) => {

      if (formatBrDate(element.date) === formatBrDate(date) && element.hour === formatHour(hour)) {
        if(cancelAlarm != true){
          console.warn('true');
          setIshour(true);
          setIsModalVisible(true);
        }

      }


    })

    //debug
    if (isHour) {

      al.play();

      // console.warn('alarm dispatch');

    } else {

      al.stop();
      // console.warn('break')

    }


  }, 1000)

  useEffect(() => {

    Sound.setCategory('PlayBack', true);

    let al = new Sound(alert);

    setAlert(al);

    const loadList = () => {
      api.get('/medicine')
        .then((response) => {
          // console.warn(response)
          setMedicine(response.data)
        })
    }
    loadList();

  }, [])

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
      {renderModal()}

      <View style={{ height: 20 }} />
    </Container>
  );
}
