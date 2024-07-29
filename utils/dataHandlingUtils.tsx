import { FaceStateEnum } from "@/constants/faceStateEnum";
import { RobotStateDTO } from "@/types/robotSateDTOType";
import { global } from "@/utils/global";
import { Room } from "@/types/roomType";
import { Button } from "react-native-paper";
import { Link } from "expo-router";
import {  View, Image, StyleSheet, Dimensions } from "react-native";
import { rooms } from "@/constants/rooms";
import { Mission } from "@/types/missionDTO";
import { AckType } from "@/types/ackType";



export function getFavoriteRooms(rooms: {[key: number]: Room}): Room[] {
  return Object.values(rooms).filter(room => room.favorite);
}

export function getRoomIdString(roomId: number) {
  const roomIdString = roomId.toString();
  if (roomIdString.length === 1) {
    return `R00${roomIdString}`;
  }
  if (roomIdString.length === 2) {
    return `R0${roomIdString}`;
  }
  return `R${roomIdString}`;
}


export function setPeriodicUpdate(seconds: number) {
  //every 30 seconds
  setInterval(() => {
    const robotStateDTO = global.getRobotStateDTO();
    if (robotStateDTO != null && global.initialized) {
      global.mqttHandler!.sendMessage("robotDataCruncher", JSON.stringify(robotStateDTO))
    }
  }, seconds * 1000);
}


export function getFacePage(faceState: FaceStateEnum) {
  if (faceState === FaceStateEnum.IDLE) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/DefaultFace.jpg')}/>
      <View style={styles.buttonContainer}>
        <Link href="/informations" asChild>
          <Button style={styles.button} buttonColor="#426EB8" mode="elevated" dark >Informationen</Button> 
        </Link>
        <Link href="/login" asChild>
          <Button style={styles.button} buttonColor="#426EB8" mode="elevated" dark >Login</Button>
        </Link>
      </View>
      </>
      
    )
  }
  else if (faceState === FaceStateEnum.BUSY) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/BeschäftigtFace.jpg')}/>
      </>
    )
  }
  else if (faceState === FaceStateEnum.ERROR) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/ErrorFace.jpg')}/>
      
      </>
    )
  }
  else if (faceState === FaceStateEnum.CHARGING) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/ChargingFace.jpg')}/>
      </>
    )
  }
  else if (faceState === FaceStateEnum.DONE) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/DankeFace.jpg')}/>
      </>
    )
  }
  else if (faceState === FaceStateEnum.HELP) {
    return (
      <>
      <Image style={styles.image} source={require('../assets/images/HelpFace.jpg')}/>
      </>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#47ED87',
  },
  text: {
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    padding: 10,
    marginTop: 250,
  },
  button: {
    flexDirection: 'row',
  },
  image: {
    width: '60%',
    height: '50%',
    marginTop: 150,
    marginRight: 20,  // Adrian muss unbedingt die Assets anpassen!

  },
});



// wird eh nur gecalled wenn destination != null ist!
export default function simulateRobotMovement() {

  if (global.initialized) {
    const mission = global.mission;
    const targetRoom = rooms[mission!.roomId];
    const currentFloor = global.currentFloor;
    const difference = Math.abs(targetRoom.Level - currentFloor!);

    let completed = 0;
    global.setFaceStateCallback!(FaceStateEnum.BUSY);
    
    if (targetRoom.roomId === 666) {
      for (let i = 0; i <= difference; i++) {
        setTimeout(() => {
          console.log('Walking to the destination');
          completed++;
          if (completed === difference + 1) {
            global.setFaceStateCallback!(FaceStateEnum.ERROR);
            global.setCurrentFloorCallback!(i);
          }
        }, 5000 * i);
      }
    } else {
        for (let i = 0; i <= difference; i++) {
          setTimeout(() => {
            console.log('Walking to the destination');
            completed++;
    
            if (completed === difference + 1) {
              global.setFaceStateCallback!(FaceStateEnum.DONE);
              global.setCurrentFloorCallback!(targetRoom.Level);
            }
          }, 5000 * i);
        }
      }

    
  }
}



export function onMessageArrivedCallback(message: any) {

  console.log("LOOOL" + message.destinationName);
  if (message.destinationName === global.robotId) {

    // Das der Destination Name nur Mission DTOs enthält!
    console.log('Message arrived:', message.payloadString);

    const messageObject: Mission = JSON.parse(message.payloadString);
    
    if (messageObject.roomId != null && global.initialized) {
    
      //Dadurch, dass die Objekt Relation garantiert neu ist, wir der State immer geupdated!
      const newMission = {
        missionId: messageObject.missionId,
        roomId: messageObject.roomId,
        phoneId: messageObject.phoneId,
      }

      acknowledgeMission(true);
      global.setMissionCallback!(newMission);
    } else {
      acknowledgeMission(false);
    }
  } else {
    acknowledgeMission(false);
  }
  
}

function acknowledgeMission(accepted: boolean) {
  const ack: AckType = {
    robotId: global.robotId!,
    accepted: accepted,
  }

  console.log('Acknowledge Mission:', ack);
  global.mqttHandler!.sendMessage("Ack" + global.robotId, JSON.stringify(ack));
}