import React, { useState, useEffect, useRef } from "react";
import { View, DeviceEventEmitter } from "react-native";
import {
  Container,
  List,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalTitleContent,
  ModalDescription,
  ModalTextDescription,
  ModalContainerButton,
  ModalButton,
  ModalButtonText
} from "./styles";
import io from "socket.io-client";
import ReactNativeAN from "react-native-alarm-notification";
import AppState from "react-native-app-state";
import Card from "../../components/Card/index";
import api from "../../services/api";
import moment from "moment";
import Sound from "react-native-sound";
import Modal from "react-native-modal";

// set exact date time | Format: dd-MM-yyyy HH:mm:ss

const alert = require("../../../android/assets/sounds/alert.wav");

export default function Medicine() {
  const [medicineList, setMedicine] = useState([]);
  const [isHour, setIshour] = useState(false);
  const [al, setAlert] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cancelAlarm, setCancelAlarm] = useState(false);
  const [descriptionMedice, setDescriptionMedice] = useState({});
  const [countDispatch, setCountDispatch] = useState(0);
  const [notify, setNotify] = useState(true);

  const registerToSocket = () => {
    // let urlBase = 'http://192.168.100.8:3333';//ip fixo da minha rede
    const urlBase = "https://medreminder-backend.herokuapp.com";
    let socket = io(urlBase);

    socket.on("medicine", newMedicine => {
      console.log(newMedicine);
      setMedicine(prevMedicine => [newMedicine, ...prevMedicine]);
    });
  };

  const method = () => {
    const date = new Date();

    console.log("teste");

    // DD/MM/YYYY HH:mm

    let dateShedulle;

    console.log("antes do forEach");
    medicineList.forEach(element => {
      console.log("dentro do foreach");
      console.log("moment", moment(element.date).format("DD-MM-YYYY HH:mm:ss"));
      console.log("date atual", moment(date).format("DD-MM-YYYY HH:mm:ss"));
      if (
        moment(element.date).format("DD-MM-YYYY") ===
        moment(date).format("DD-MM-YYYY")
      ) {
        console.log("entrou");
        dateShedulle = moment(element.date).format("DD-MM-YYYY HH:mm:ss");
        hourShedulle = element.hour;
      }
    });

    const alarmNotifData = {
      id: "12345", // Required
      title: "Hora de Tomar o remédio", // Required
      message: "Abra o aplicativo e visualize o horário do seu medicamento", // Required
      channel: "my_channel_id", // Required. Same id as specified in MainApplication's onCreate method
      ticker: "My Notification Ticker",
      auto_cancel: true, // default: true
      vibrate: true,
      vibration: 100, // default: 100, no vibration if vibrate: false
      small_icon: "ic_launcher", // Required
      large_icon: "ic_launcher",
      play_sound: true,
      sound_name: alert, // Plays custom notification ringtone if sound_name: null
      color: "red",
      schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
      tag: "some_tag",
      fire_date: dateShedulle,
      // fire_date: moment(element.date).format('dd-MM-yyyy HH:mm:ss'),
      // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.
      // const formateDate = moment(dateParams).format('DD/MM/YYYY');
      // You can add any additional data that is important for the notification
      // It will be added to the PendingIntent along with the rest of the bundle.
      // e.g.
      data: { foo: "bar" }
    };
    ReactNativeAN.scheduleAlarm(alarmNotifData);
  };

  useEffect(() => {
    loadList();
    configSound();
    registerToSocket();
    method();
  }, []);

  const loadList = () => {
    api.get("/medicine").then(response => {
      // console.log(response)
      setMedicine(response.data);
    });
  };

  const configSound = () => {
    Sound.setCategory("PlayBack", true);

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
  const onAppStateChange = (appState, prevAppState) => {
    console.log("onAppStateChange()", prevAppState, "=>", appState);
    if (prevAppState === "active" && appState === "background") {
      console.log("aqui faço alguma coisa");
      // method();
    }
    // E.g. output: "App onAppStateChange() background => active"
  };
  const toggleModal = () => {
    setNotify(false);
    setIsModalVisible(false);
    setIshour(false);
    DeviceEventEmitter.removeListener("OnNotificationDismissed");
    DeviceEventEmitter.removeListener("OnNotificationOpened");
    ReactNativeAN.removeAllFiredNotifications();
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
                <ModalButton
                  activeOpacity={0.5}
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  <ModalButtonText>Desligar Alarme</ModalButtonText>
                </ModalButton>
              </ModalContainerButton>
            </ModalContent>
          </ModalContainer>
        </Modal>
      );
    }
  };

  useInterval(() => {
    const date = new Date();

    const hour = new Date();

    if (notify != false) {
      method();
    }

    medicineList.forEach(element => {
      //
      if (
        formatBrDate(element.date) === formatBrDate(date) &&
        element.hour === formatHour(hour)
      ) {
        if (
          countDispatch > 0 &&
          formatBrDate(element.date) === formatBrDate(date) &&
          element.hour === formatHour(hour)
        ) {
          setCancelAlarm(true);
          console.log("teste de count > 0 ");
        }

        let count = 0;

        const functionTimer = setInterval(() => {
          count++;

          if (countDispatch > 0) {
            if (count === 60 && countDispatch > 0) {
              setCancelAlarm(false);
              clearInterval(functionTimer);
            }
          }
        }, 1000);

        if (cancelAlarm != true) {
          console.log("true");
          setDescriptionMedice(element);
          setIshour(true);
          setIsModalVisible(true);
          setCountDispatch(1);
        }
      }
    });

    //debug
    if (isHour) {
      al.play();
      console.log("alarm dispatch");
    } else {
      al.stop();
      console.log("break");
    }
  }, 1000);

  const formatBrDate = dateParams => {
    const formateDate = moment(dateParams).format("DD/MM/YYYY");
    return formateDate;
  };
  const formatHour = hourParams => {
    const formatHour = moment(hourParams).format("HH:mm");
    return formatHour;
  };

  const getHour = () => {
    const hour = new Date();

    const hourFormat = moment(hour).format("HH:mm");

    console.warn(hourFormat);
  };

  const renderItem = ({ item }) => (
    <Card
      data={item}
      key={item._id}
      name={item.name}
      description={item.description}
      date={formatBrDate(item.date)}
      hour={item.hour}
    />
  );

  return (
    <Container>
      <AppState onChange={onAppStateChange}>
        {({ appState }) => (
          <View>
            <Text>App state: {appState}</Text>
          </View>
        )}
        <List
          data={medicineList}
          renderItem={renderItem}
          keyExtractor={item => String(item._id)}
        />
        {renderModal()}

        <View style={{ height: 20 }} />
      </AppState>
    </Container>
  );
}
