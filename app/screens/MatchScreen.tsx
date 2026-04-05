import Corner from '@/components/Corner';
import Counter from '@/components/Counter';
import PointsButton from '@/components/PointsButton';
import Timer from '@/components/Timer';
import TimerButton, { TimerButtonProps } from '@/components/TimerButton';
import WarningButton from '@/components/WarningButton';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';



export default function MatchScreen(){

    const [counterRed, setCounterRed] = useState(0)
    const [counterBlue, setCounterBlue] = useState(0)
    const [buttonState, setButtonState] = useState<TimerButtonProps["state"]>("play" as const)

    return(
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={36} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          
          <Text style={styles.headerTitle}>Доянг №1</Text>
        </View>
      </View>

    <View style={styles.TimerBlockWrapper}>
      <TimerButton state={buttonState} onClick={()=>setButtonState(buttonState==="play"?"pause" as const:"play" as const)}></TimerButton>
      <Timer></Timer>  
    </View>
    <View style={styles.CornersWrapper}>
        <Corner color='Red'></Corner><Corner color='Blue'></Corner>
    </View>
    <View style={styles.CountersWrapper}>
        <Counter counter={counterRed}/><Counter counter={counterBlue}/>
    </View>
    <View style={styles.PointButtonsBlockWrapper}>
        <View style={styles.ButtonRowWrapper}>
            <PointsButton text='+3' onClick={()=>setCounterRed(counterRed+3)}/>
            <PointsButton text='+3' onClick={()=>setCounterBlue(counterBlue+3)}/>
        </View>
        <View style={styles.ButtonRowWrapper}>
            <PointsButton text='+2' onClick={()=>setCounterRed(counterRed+2)}/>
            <PointsButton text='+2' onClick={()=>setCounterBlue(counterBlue+2)}/>
        </View>
        <View style={styles.ButtonRowWrapper}>
            <PointsButton text='+1' onClick={()=>setCounterRed(counterRed+1)}/>
            <PointsButton text='+1' onClick={()=>setCounterBlue(counterBlue+1)}/>
        </View>
        <View style={styles.ButtonRowWrapper}>
            <WarningButton text='Предупреждение' onClick={()=>setCounterBlue(counterBlue+1)}/>
            <WarningButton text='Предупреждение' onClick={()=>setCounterRed(counterRed+1)}/>
        </View>
    
    
        
        
    </View>
      
     
    </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#053552',
    paddingTop: 40,
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitleRow: { 

    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center', 
    // justifyContent: 'center',
    marginLeft: '25%'
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginLeft: 8 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 20,
    gap: 15
  },
  searchInputWrapper: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 4, 
    height: 40, 
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  searchInput: { 
    color: '#000', 
    fontSize: 16 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 100 
  },
  card: { 
    backgroundColor: '#0E4E75', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15,
    // Используем современный способ для теней
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
  },
  cardName: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  cardInfoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 3 
  },
  statusDot: { 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    marginRight: 8 
  },
  cardInfoText: { 
    color: '#fff', 
    fontSize: 16 
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    backgroundColor: '#084366',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A6B9B',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  CornersWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  CountersWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 27
  },
  ButtonRowWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  PointButtonsBlockWrapper:{
    marginTop: 7
  },
  TimerBlockWrapper:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});