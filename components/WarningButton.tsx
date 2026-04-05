import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export type WarningButtonProps = {
    text: string,
    onClick: ()=>void
}

export default function WarningButton(props:WarningButtonProps) {
  return (
    <TouchableOpacity style={styles.WarningButton} onPressOut={props.onClick}>
        <Text style={styles.WarningButton_Text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  WarningButton:{
    marginVertical: 5,
    width: 130,
    height: 75,
    backgroundColor: '#B91C1C',
    borderRadius: 50,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 25,
    shadowOffset: {width:6, height:6},
    elevation: 6,
    shadowRadius: 6
  },
  WarningButton_Text:{
    fontFamily: 'Arial',
    color: '#fff',
    fontSize: 14,
    fontWeight: '800'
  }
});