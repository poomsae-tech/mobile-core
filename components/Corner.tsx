import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type CornerProps = {
    color: 'Red' | 'Blue'
}
export default function Corner(props:CornerProps) {
  return (
    <View style={props.color==='Red'?styles.CornerRed:styles.CornerBlue}>
        <Text style={styles.Text}>{props.color==='Red'?'Красный угол':'Синий угол'}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
    Text:{
        fontFamily: 'Arial',
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    CornerRed:{
    borderColor: '#ff0000',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderWidth: 2,
    borderStyle: 'solid',
    width: 109,
    height: 60,
    
  },
  CornerBlue:{
    borderColor: '#0000ff',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderWidth: 2,
    borderStyle: 'solid',
    width: 109,
    height: 60,
  }
});