import React from "react";
import { Dimensions, View, StyleSheet, Text, Modal } from "react-native";
import FavoritenListe from "./favoritenListe";
import KeyPad from "./keyPad";
import { Button } from "react-native-paper";
import { BlurView } from 'expo-blur';
import { rooms } from "@/constants/rooms";
import { Room } from "@/types/roomType";
import { getRoomIdString } from "@/utils/dataHandlingUtils";
import { Link, router } from "expo-router";
import { global } from "@/utils/global";
import { FaceStateEnum } from "@/constants/faceStateEnum";
const { width, height } = Dimensions.get('window');


export default function Where() {

  const [correctRoomModal, setCorrectRoomModal] = React.useState(false);
  const [wrongRoomModal, setWrongRoomModal] = React.useState(false);
  const [currentRoom, setCurrentRoom] = React.useState<Room>({} as Room);

  const showModal = (roomId: number) => {

    if (rooms.hasOwnProperty(roomId)) {
      setCurrentRoom(rooms[roomId]);
      setCorrectRoomModal(true);
    } else {
      setWrongRoomModal(true);  
    }      
  }

  const closeModal = () => {
    setCorrectRoomModal(false);
    setWrongRoomModal(false);
  }

  const sendMission = () => {

    if (global.initialized){


      if (global.connected === false) {
        alert('Keine Verbindung zum Roboter');
      } else {
        console.log('Mission Set');

        const newMission = {
          missionId: (Math.random() * 10000000).toString(),
          roomId: currentRoom.roomId,
          phoneId: null,
        }
        global.setMissionCallback!(newMission);
        global.setFaceStateCallback!(FaceStateEnum.BUSY);
        router.push('/confirmation');
      }


      
    }
  }

  //TODO: das brauchen wir wahrscheinlich nicht
  const setSelectedRoom = () => {
    global.selectedRoom = currentRoom; 
  }

  return (
    <View id='MainContainer' style={styles.mainContainer}>
      <Text style={styles.header}>Wohin geht's?</Text>
      <View id='favoriteContainer' style={[styles.itemContainer, styles.favoriteContainer]}>
        <Text style={styles.header2}>Favoriten</Text>
        <FavoritenListe showModal={showModal} />
      </View>
      <View id='keyPad' style={[styles.itemContainer, styles.keyPadContainer]}>
        <KeyPad showModal={showModal} />
      </View>

      {correctRoomModal && <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="systemMaterial" >
        <Modal animationType='slide' transparent={true} visible={correctRoomModal}>
          <View style={modalStyles.modalBackground}>
            <Text style={styles.header2}>Auftrag Bestätigen</Text>
            <View id={currentRoom.roomId.toString()} key={currentRoom.roomId} style={styles.roomContainer}>
              <Text style={styles.roomId}>{getRoomIdString(currentRoom.roomId)}</Text>
              <Text style={styles.description}>{currentRoom.description}</Text>
              <Text style={styles.level}>Stock: {currentRoom.Level}</Text>
            </View>
            <View style={modalStyles.buttonContainer}>
              <Button onPress={closeModal} buttonColor="#BA5529" mode="elevated" dark>Schließen</Button>
              <Button onPress={() => {closeModal(); sendMission()}} buttonColor="#538569" mode="elevated" dark>Bestätigen</Button>
            </View>
          </View>
        </Modal>
      </BlurView>}
      {wrongRoomModal && <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="systemMaterial" >
        <Modal animationType='slide' transparent={true} visible={wrongRoomModal}>
          <View style={modalStyles.modalBackground}>
            <Text style={styles.header2}>Den Raum gibt es nicht</Text>
            <View style={{top: 40}}>
              <Button onPress={closeModal} buttonColor="#BA5529" mode="elevated" dark>Schließen</Button>
            </View>
          </View>
        </Modal>
      </BlurView>}
    </View>
  )
}


const modalStyles = StyleSheet.create({
  modalBackground: {
    width: 557,
    height: 291,
    top: 311,
    left: 591,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 28,
  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    padding: 10,
    marginTop: 50,
  }

});

// Alle Pixel Values sind hardgecoded und nicht responsive. Man kann sich also genau an die Figma Werte halten!
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: '#426EB8',
  },
  header: {
    fontSize: 44,
    color: 'white',
    top: 32,
    left: 680
  },
  header2: {
    fontSize: 30,
    color: 'black',
    top: 0,
    left: 0,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 28,
    position: 'absolute',
  },
  favoriteContainer: {
    width: 543,
    height: 752,
    top: 163,
    left: 106,
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyPadContainer: {
    width: 907,
    height: 752,
    top: 163,
    left: 727,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    top: 10,
    width: 350
  },
  roomId: {
    flex: 1,
    fontSize: 19,
  },
  description: {
    flex: 2,
    textAlign: 'center',
    right: -30
  },
  level: {
    flex: 3,
    textAlign: 'right',
    right: 40
  }
})
