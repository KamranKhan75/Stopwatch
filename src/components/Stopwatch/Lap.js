import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Timer from './Timer';

const Lap = ({number, interval, fastest, slowest}) => {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest,
      ];
      return (
        <View style={styles.lap}>
          <Text style={lapStyle}>Lap {number}</Text>
          <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
        </View>
      );
}

export default Lap

const styles = StyleSheet.create({
    lapText: {
        color: '#FFFFFF',
        fontSize: 18,
      },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        paddingVertical: 10,
      },
      lapTimer: {
        width: 30,
      },
     fastest: {
        color: '#4BC05F',
      },
      slowest: {
        color: '#CC3531',
      },
})
