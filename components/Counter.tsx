import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type CounterProps = {
    counter: number
}

export default function Corner(props:CounterProps) {
  return (
    <View style={styles.Counter}>
        <Text style={styles.Text}>{props.counter}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  Counter:{
    width: 109,
    height:79,
    color: '#000',
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    textAlignVertical: 'center',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text:{
    fontSize: 36,
    fontFamily: 'Arial',
    textAlign: 'center',
    
  }
});