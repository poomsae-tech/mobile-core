import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export type PointsButtonProps = {
    text: string,
    onClick: ()=>void
}

export default function PointsButton(props:PointsButtonProps) {
  return (
    <TouchableOpacity style={styles.PointsButton} onPressOut={props.onClick}>
        <Text style={styles.PointButton_Text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  PointsButton:{
    marginVertical: 5,
    width: 130,
    height: 75,
    backgroundColor: '#0C4A6E',
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
  PointButton_Text:{
    fontFamily: 'Arial',
    color: '#fff',
    fontSize: 48
  }
});