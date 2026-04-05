import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export type TimerButtonProps = {
    state: 'play' | 'pause',
    onClick: ()=>void
}

export default function TimerButton(props:TimerButtonProps) {
  return (
    <TouchableOpacity style={props.state==='play'?styles.TimerButton_Play:styles.TimerButton_Pause} onPressOut={props.onClick}>
        {props.state==='play'?<Text style={styles.TimerButton_Text}>▶️</Text>:<Text style={styles.TimerButton_Text}>⏸️</Text>}
    </TouchableOpacity>
  )
}

export const styles = StyleSheet.create({
  TimerButton:{
    
  },
  TimerButton_Play:{
    marginTop: 0,
    marginBottom: 20,
    width: 169,
    height: 65,
    
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
    shadowRadius: 6,
    backgroundColor: '#00FF00BF',
  },
  TimerButton_Pause:{
    marginTop: 0,
    marginBottom: 20,
    width: 169,
    height: 65,
    
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
    shadowRadius: 6,
    backgroundColor: '#D0C224',
  },
  TimerButton_Text:{
    fontFamily: 'Arial',
    color: '#fff',
    fontSize: 45,
    fontWeight: '800'
  }
});