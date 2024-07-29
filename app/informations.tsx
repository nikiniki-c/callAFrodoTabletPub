import { FaceStateEnum } from "@/constants/faceStateEnum";
import React from "react";
import {  View, Image, StyleSheet, Dimensions, BackHandler } from "react-native";
import { Text } from 'react-native-paper';
import  { global } from "@/utils/global";


const { width , height } = Dimensions.get('window');

export default function Informations() {

    React.useEffect(() => {
        const interval = setInterval(() => {
          
          if (global.initialized){
            global.setFaceStateCallback!(FaceStateEnum.BUSY);
          }
          clearInterval(interval);
        }, 500)
        
      }, []);


      React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => { 
          
          console.log('Back Pressed'); 
          if (global.initialized){
            global.setFaceStateCallback!(FaceStateEnum.IDLE);
          }
          return false; 
        });
    
      }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Hallo! Ich bin Frodo{"\n"}
                Der Transportroboter des Universitätsklinikums Bochum.{"\n"}{"\n"}
                Meine Aufgabe ist es, dem Personal beim transportieren von Blutproben zu helfen.
            </Text>
            <Image style={styles.image} source={require('../assets/images/BeschäftigtFace.jpg')}/>
            <Text style={styles.text}>
                Ich bin gerade beschäftigt also muss ich mich nun entschuldigen!{"\n"}
                Tschüss!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#3396FE',
    },
    image: {
        width: '60%',
        height: '50%',
        marginTop: 0,

    },
    text: {
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
        marginTop: 50,
    },
});