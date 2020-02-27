import React, { useEffect, useState } from 'react';

import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar, View, ScrollView, TouchableOpacity
} from 'react-native';
import moment from 'moment'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#FFFFFF',
    fontSize: 76,
    fontWeight: '200',
    width: 110,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lapText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color: '#4BC05F',
  },
  slowest: {
    color: '#CC3531',
  },
  timerContainer: {
    flexDirection: 'row',
  },
  // container: {
  //   alignItems: 'center',
  //   flex: 1,
  //   paddingHorizontal: 20,
  // },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.11,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').height * 0.11 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Timer = ({ interval, style }) => {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(centiseconds)}</Text>
    </View>
  )
}

const RoundButton = ({ title, color, background, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
const Lap = ({ number, interval, fastest, slowest }) => {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number}</Text>
      <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
    </View>
  )
}

const LapsTable = ({ laps, timer }) => {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min) min = lap
      if (lap > max) max = lap
    })
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  )
}

const ButtonsRow = ({ children }) => {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}

const Main = () => {

  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timer, setTimer] = useState(now - start);

  const startFn = () => {
    let now = new Date().getTime();
    setStart(now);
    setNow(now);
    setLaps([0]);
    setTimer(setInterval(() => {
      setNow(new Date().getTime())
    }, 100));
  }

  const lap = () => {

    const timestamp = new Date().getTime();
    const [firstLap, ...other] = laps;
    setLaps([0, firstLap + (now - start), ...other])
    setStart(timestamp);
    setNow(timestamp);

  }

  const stop = () => {
    clearInterval(timer)
    const [firstLap, ...other] = laps;
    setLaps([firstLap + (now - start), ...other]);
    setStart(0);
    setNow(0);
  }

  const reset = () => {
    setLaps([]);
    setStart(0);
    setNow(0);
  }

  const resume = () => {

    const now = new Date().getTime()
    setStart(now);
    setNow(now);
    setTimer(setInterval(() => {
      new Date().getTime()
    }, 100));
  }
  return (
    <View style={styles.container}>
      <Timer
        interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        style={styles.timer}
      />
      {laps.length === 0 && (
        <ButtonsRow>
          <RoundButton
            title='Lap'
            color='#8B8B90'
            background='#151515'
            disabled
          />
          <RoundButton
            title='Start'
            color='#50D167'
            background='#1B361F'
            onPress={() => startFn()}
          />
        </ButtonsRow>
      )}
      {start > 0 && (
        <ButtonsRow>
          <RoundButton
            title='Lap'
            color='#FFFFFF'
            background='#3D3D3D'
            onPress={() => lap()}
          />
          <RoundButton
            title='Stop'
            color='#E33935'
            background='#3C1715'
            onPress={() => stop()}
          />
        </ButtonsRow>
      )}
      {laps.length > 0 && start === 0 && (
        <ButtonsRow>
          <RoundButton
            title='Reset'
            color='#FFFFFF'
            background='#3D3D3D'
            onPress={() => reset()}
          />
          <RoundButton
            title='Start'
            color='#50D167'
            background='#1B361F'
            onPress={() => resume()}
          />
        </ButtonsRow>
      )}
      <LapsTable laps={laps} timer={timer} />
    </View>
  )
}


export default Main;
