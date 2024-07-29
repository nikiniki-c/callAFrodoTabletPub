import React from "react";
import {  View, Image, StyleSheet, Dimensions } from "react-native";
import { FaceStateEnum } from "@/constants/faceStateEnum";
import DeviceInfo from 'react-native-device-info';
import { MqttHandler } from "@/mqtt/mqttHandler";
import { global } from "@/utils/global";
import simulateRobotMovement, { getFacePage, onMessageArrivedCallback, setPeriodicUpdate } from "@/utils/dataHandlingUtils";
import { faceStateColors } from "@/constants/faceStateColors";
import { Mission } from "@/types/missionDTO";


const { width , height } = Dimensions.get('window'); 


export default function Index() {

  const [faceState, setFaceState] = React.useState(FaceStateEnum.HELP);
  const [currentFloor, setCurrentFloor] = React.useState(0);
  const [connected, setConnected] = React.useState(false);
  const [robotId, setRobotId] = React.useState('');
  const [mission, setMission] = React.useState<Mission | null>(null);
  const triedConnecting = React.useRef(false);

  const [mqttHandler, setMqttHandler] = React.useState<MqttHandler | null>(null);


  React.useEffect(() => {
    const fetchUniqueId = async () => {
      const id = await DeviceInfo.getUniqueId();
      const newUniqueId = "Robot" + id;
      console.log(newUniqueId);
      setRobotId(newUniqueId);
      setMqttHandler(new MqttHandler("urOwnURL", newUniqueId, setConnected));
    };

    fetchUniqueId();
  }, []);


  React.useEffect(() => {
    //setPeriodicUpdate(30);
  }, [])


  console.log('Connected: ', connected);

  React.useEffect(() => {
    // setzt das Globale Objekt und lädt die Werte bei Änderungen neu rein
    if (mqttHandler != null) {
      global.updateGlobal(mqttHandler, robotId, setFaceState, setCurrentFloor, setMission, currentFloor, faceState, mission, connected);
    }
  }, [faceState, currentFloor, mqttHandler, robotId, mission, connected]);


  React.useEffect(() => {
    if (faceState == FaceStateEnum.DONE) {
      setTimeout(() => {
        setFaceState(FaceStateEnum.IDLE);
        setMission(null);
      }, 3000);
    }
  }, [faceState]);

  

  React.useEffect(() => {
    //initalisierung der MQTT Connection
    
    if (!triedConnecting.current && mqttHandler != null) {
      console.log('Connecting to MQTT Broker');
      mqttHandler.connectToMqttBroker();
      triedConnecting.current = true;
    }
  }, [robotId, mqttHandler]);

  
  React.useEffect(() => {
    // sends the current robot state to the server
    if (connected && mqttHandler != null) {
      console.log("Message wird gecalled");
      const currentRobotStateDTO = global.getRobotStateDTO();
      if (currentRobotStateDTO != null) {
        mqttHandler.sendMessage("robotDataCruncher", JSON.stringify(currentRobotStateDTO));
      }
    }
    
  }, [connected, faceState, currentFloor, mission]);


  React.useEffect(() => {
    if (connected && mqttHandler != null) {
      mqttHandler.subscribeToTopic(robotId)
      mqttHandler.client.onMessageArrived = onMessageArrivedCallback
  }
  }, [connected]);


  React.useEffect(() => {

    if (mission === null && connected) {
      setFaceState(FaceStateEnum.IDLE);
    } else if (mission === null && !connected) {
      setFaceState(FaceStateEnum.HELP);
    }
    else {
      simulateRobotMovement();
    }
  }, [mission]);

  console.log('Mission: ', mission);


  //TODO Die Knöpfe darf es nur geben, wenn der Roboter im idle State ist
  return (
    <View style={[styles.container, {backgroundColor: faceStateColors[faceState]}]}>
      {getFacePage(faceState)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flexGrow: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
  },
 
});