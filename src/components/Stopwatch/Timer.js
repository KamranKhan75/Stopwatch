import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment';

const Timer = ({interval, style}) => {
        const pad = n => (n < 10 ? '0' + n : n);
        const duration = moment.duration(interval);
        const centiseconds = Math.floor(duration.milliseconds() / 10);
        return (
          <View style={styles.timerContainer}>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())}:</Text>
            <Text style={style}>{pad(centiseconds)}</Text>
          </View>
        );
}

export default Timer

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'row',
      },
})
