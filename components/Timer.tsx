import { StyleSheet, Text, View } from 'react-native';


export type TimerProps = {
    startTime?: Date,
    timerDuration?: number,
    state?: 'runnung' | 'paused'
}

export default function Timer(props: TimerProps) {
  return (
    <View style={styles.TimerWrapper}>
        <Text style={styles.TimerHeaderText}>Таймер</Text>
        <Text style={styles.TimerText}>2:00</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
    TimerWrapper:{
        borderWidth: 1,
        padding: 5,
        width: 100,
        height:70,
        marginLeft: -45
        
    },
    TimerHeaderText:{
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'

    },
    TimerText:{
        fontFamily: 'Arial',
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
    }
});