import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Timer from './src/components/Stopwatch/Timer';
import RoundButton from './src/components/Stopwatch/RoundButton';
import LapsTable from './src/components/Stopwatch/LapsTable';

function ButtonsRow({children}) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
const App = () => {
  const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  const [laps, setLaps] = useState([]);
  let timerInterval = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []);

  const startTimer = () => {
    const cnow = new Date().getTime();
    setStart(cnow);
    setNow(cnow);
    setLaps([0]);

    timerInterval.current = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);
  };

  const lapTimer = () => {
    const timestamp = new Date().getTime();
    const [firstLap, ...other] = laps;
    setLaps([0, firstLap + now - start, ...other]);
    setStart(timestamp);
    setNow(timestamp);
  };

  const stopTimer = () => {
    clearInterval(timerInterval.current);
    const [firstLap, ...other] = laps;
    setLaps([firstLap + now - start, ...other]);
    setStart(0);
    setNow(0);
  };

  const resetTimer = () => {
    setLaps([]);
    setStart(0);
    setNow(0);
  };

  const resumeTimer = () => {
    const cnow = new Date().getTime();
    setStart(cnow);
    setNow(cnow);

    timerInterval.current = setInterval(() => {
      setNow(new Date().getTime());
    }, 100);
  };

  const timer = now - start;
  return (
    <View style={styles.container}>
      <Timer
        interval={laps.reduce((total, curr) => total + curr, 0) + timer}
        style={styles.timer}
      />
      {laps.length === 0 && (
        <ButtonsRow>
          <RoundButton
            title="Lap"
            color="#8B8B90"
            background="#151515"
            disabled
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={startTimer}
          />
        </ButtonsRow>
      )}
      {start > 0 && (
        <ButtonsRow>
          <RoundButton
            title="Lap"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={lapTimer}
          />
          <RoundButton
            title="Stop"
            color="#E33935"
            background="#3C1715"
            onPress={stopTimer}
          />
        </ButtonsRow>
      )}
      {laps.length > 0 && start === 0 && (
        <ButtonsRow>
          <RoundButton
            title="Reset"
            color="#FFFFFF"
            background="#3D3D3D"
            onPress={resetTimer}
          />
          <RoundButton
            title="Start"
            color="#50D167"
            background="#1B361F"
            onPress={resumeTimer}
          />
        </ButtonsRow>
      )}
      <LapsTable laps={laps} timer={timer} />
    </View>
  );
};

export default App;

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
});
