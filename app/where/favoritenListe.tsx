import { Room } from "@/types/roomType";
import { getFavoriteRooms, getRoomIdString } from "@/utils/dataHandlingUtils";
import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { rooms } from "@/constants/rooms";




export default function FavoritenListe({showModal}: {showModal: (roomId: number) => void}) {

  const favorites = React.useRef<Room[]>(getFavoriteRooms(rooms))

  //Math
  return (
    <View id='favoriteList' style={styles.liste}>
      <ScrollView id='liste' contentContainerStyle={styles.listContent}>
        {favorites.current.map((room, index) => (
          <TouchableOpacity style={styles.touchElement} key={Math.random()} onPress={() => showModal(room.roomId)}>
            <View id={room.roomId.toString()} key={room.roomId} style={styles.roomContainer}>
              <Text style={styles.roomId}>{getRoomIdString(room.roomId)}</Text>
              <Text style={styles.description}>{room.description}</Text>
              <Text style={styles.level}>Stock: {room.Level}</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  liste: {
    width: '80%',
    height: 650,
    top: 30,
  },
  room: {
    height: 60,
    width: '80%',
    borderColor: 'red',
    borderWidth: 2,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  touchElement: {
    width: '100%',
    height: 60,
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

});