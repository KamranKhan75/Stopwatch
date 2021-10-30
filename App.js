import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {TestScheduler} from '@jest/core';
const DATA = {
  timer: 1234567,
  laps: [
    12345, 23456, 34567, 45678, 12345, 23456, 34567, 45678, 12345, 23456, 34567,
    45678, 12345, 23456, 34567, 45678, 12345, 23456, 34567, 45678, 12345, 23456,
    34567, 45678,
  ],
};
const Timer = ({interval, style}) => {
  const duration = moment.duration(interval);
  const centiSeconds = Math.floor(duration.milliseconds() / 10);
  return (
    <Text style={style}>
      {duration.minutes()} : {duration.seconds()} : {centiSeconds}{' '}
    </Text>
  );
};
const ButtonRound = ({title, color, background}) => {
  return (
    <View style={[styles.button, {backgroundColor: background}]}>
      <View style={styles.btnBorder}>
        <Text style={[styles.btnTitle, {color}]}> {title} </Text>
      </View>
    </View>
  );
};

const Lap = ({number, interval, fastest, slowest}) => {
  const lapStyle=[
    styles.lap,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  return (
    <View style={lapStyle}>
      <Text style={styles.lapText}>Lap {number} </Text>
      <Timer style={styles.lapText} interval={interval} />  
    </View>
  );
};
const LapsIntervals = ({laps}) => {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if(finishedLaps.length >= 2){
    finishedLaps.forEach(lap => {
      if(lap< min) min = lap 
      if(lap > max ) max = lap
    });
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={lap}
        />
      ))}
    </ScrollView>
  );
};
const App = () => {
  return (
    <View style={styles.container}>
      <Timer interval={DATA.timer} style={styles.timer} />
      <View style={styles.btnContainer}>
        <ButtonRound title="Reset" color="#fff" background="#3D3D3D" />
        <ButtonRound title="Start" color="#50D167" background="#1B361F" />
      </View>
      <LapsIntervals laps={DATA.laps} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#fff',
    fontSize: 76,
    fontWeight: '200',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 16,
  },
  btnBorder: {
    width: 56,
    height: 56,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 50
  },
  lapText: {
    color: '#fff',
    fontSize: 16,
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest:{
    color: '#4BC05F'
  },
  slowest:{
    color: '#CC3531'
  }
});
