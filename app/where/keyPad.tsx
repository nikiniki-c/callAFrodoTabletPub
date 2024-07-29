import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Button } from "react-native-paper";


export default function KeyPad({showModal}: {showModal: (roomId: number) => void}){

  const [roomState, setRoomState] = React.useState('RaumNr.');


  const handleRoomSelection = (value: string) => {
    
    //TODO das geht viel besser: 
    if (roomState === 'RaumNr.' && value !== '←' && value !== '→') {
      setRoomState(value);
      return;
    } 
    if (roomState === 'RaumNr.' && (value === '←' || value === '→')) {
      return;
    }
    if (value === '←') {
      setRoomState(roomState.slice(0, -1))
      return;
    }
    else if (roomState.length < 3 && value !== '→') {
      setRoomState(roomState + value)
      return;
    } else if (value === '→') {
      showModal(parseInt(roomState));
      return;
    }
  }

  const renderButton = (item: string) => {

    if (item === '←' || item === '→') {
      return (
        <Button contentStyle={{paddingVertical: 20, paddingHorizontal: 20}} onPress={() => handleRoomSelection(item)} icon={item === '←' ? "arrow-left": "arrow-right"} style={styles.iconButton} buttonColor={item === '←' ? '#BA5529': '#538569'} labelStyle={styles.iconButtonText} mode="elevated" children={undefined} />
      )
    }
    return (
      <Button contentStyle={{paddingVertical: 20}} onPress={() => handleRoomSelection(item)} style={styles.button} buttonColor="#D9D9D9" mode="elevated" labelStyle={styles.buttonText}>{item}</Button>
    )

  }

  return (
    <>
      <Text style={styles.header2}>Raum auswählen</Text>
      <View id='container' style={styles.contaier}>
        <Text style={styles.raumText}>{roomState}</Text>
        <Grid style={styles.gridContainer}>
        <Row>
          <Col>{renderButton('1')}</Col>
          <Col>{renderButton('2')}</Col>
          <Col>{renderButton('3')}</Col>
        </Row>
        <Row>
          <Col>{renderButton('4')}</Col>
          <Col>{renderButton('5')}</Col>
          <Col>{renderButton('6')}</Col>
        </Row>
        <Row>
          <Col>{renderButton('7')}</Col>
          <Col>{renderButton('8')}</Col>
          <Col>{renderButton('9')}</Col>
        </Row>
        <Row>
          <Col>{renderButton('←')}</Col>
          <Col>{renderButton('0')}</Col>
          <Col>{renderButton('→')}</Col>
        </Row>
      </Grid>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  header2: {
    fontSize: 30,
    color: 'black',
    width: 300,
    textAlign: 'center',
  },
  contaier: {
    width: 750,
    height: 520,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raumText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'black',
    width: 300,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  gridContainer: {
    width: '90%',
    justifyContent: 'center',
    top: 40,
  },
  button: {
    marginHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
  }, 
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  iconButton: {
    marginHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
  }, 
  iconButtonText: {
    color: 'white',
  }

});