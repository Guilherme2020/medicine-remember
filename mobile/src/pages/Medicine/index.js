import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Container, List, ModalContainer, ModalContent, ModalTitle, ModalTitleContent, ModalDescription, ModalTextDescription, ModalContainerButton, ModalButton, ModalButtonText } from './styles';
import io from 'socket.io-client';
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
  const [descriptionMedice, setDescriptionMedice] = useState({});
  const [countDispatch, setCountDispatch] = useState(0);

  registerToSocket = () => {

    let urlBase = 'http://192.168.100.8:3333';//ip fixo da minha rede
    let socket = io(urlBase);

    socket.on('medicine', newMedicine => {
      setMedicine([newMedicine], ...medicineList);
    })

  };
  useEffect(() => {

    loadList();
    registerToSocket()
    configSound();


  }, []);


  const loadList = () => {
    api.get('/medicine')
      .then((response) => {
        // console.log(response)
        setMedicine(response.data)
      })
  };

  const configSound = () => {

    Sound.setCategory('PlayBack', true);

    let al = new Sound(alert);

    setAlert(al);

  };

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
          <ModalContainer>
            <ModalContent>
              <ModalTitleContent>
                <ModalTitle>Informações</ModalTitle>
              </ModalTitleContent>
              <ModalDescription>
                <ModalTextDescription>
                  Nome do remédio: {descriptionMedice && descriptionMedice.name}
                </ModalTextDescription>
              </ModalDescription>
              <ModalDescription>
                <ModalTextDescription>
                  Descrição:{descriptionMedice && descriptionMedice.description}
                </ModalTextDescription>
              </ModalDescription>
              <ModalDescription>
                <ModalTextDescription>
                  Horário de uso: {descriptionMedice && descriptionMedice.hour}
                </ModalTextDescription>
              </ModalDescription>
              <ModalContainerButton>

                <ModalButton activeOpacity={0.5} onPress={() => { toggleModal() }}>
                  <ModalButtonText>
                    Desligar Alarme
                  </ModalButtonText>
                </ModalButton>
              </ModalContainerButton>

            </ModalContent>
          </ModalContainer>

        </Modal >
      );

    }

  }

  useInterval(() => {

    const date = new Date();

    const hour = new Date();

    medicineList.forEach((element) => {

      if (formatBrDate(element.date) === formatBrDate(date) && element.hour === formatHour(hour)) {


        if (countDispatch > 0 && (formatBrDate(element.date) === formatBrDate(date) && element.hour === formatHour(hour))) {

          setCancelAlarm(true);
          console.log('teste de count > 0 ');

        }

        let count = 0;

        const functionTimer = setInterval(() => {

          count++;

          if (countDispatch > 0) {
            if (count === 60 & countDispatch > 0) {
              setCancelAlarm(false);
              clearInterval(functionTimer);
            }
          }
        }, 1000);

        if (cancelAlarm != true) {
          console.log('true');
          setDescriptionMedice(element);
          setIshour(true);
          setIsModalVisible(true);
          setCountDispatch(1);
        }
      }
    })

    //debug
    if (isHour) {

      al.play();
      console.log('alarm dispatch');

    } else {

      al.stop();
      console.log('break');

    }


  }, 1000);



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
