import React from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import Lap from './Lap';

const LapsTable = ({laps, timer}) => {
    const finishedLaps = laps.slice(1);
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    if (finishedLaps.length >= 2) {
      finishedLaps.forEach(lap => {
        if (lap < min) min = lap;
        if (lap > max) max = lap;
      });
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
    );
}

export default LapsTable

const styles = StyleSheet.create({
    scrollView: {
        alignSelf: 'stretch',
      },
})
