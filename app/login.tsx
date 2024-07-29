import { FaceStateEnum } from '@/constants/faceStateEnum';
import { Link, router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { global } from '@/utils/global';

const { width , height } = Dimensions.get('window');

export default function Login() {

  const [password, onChangePass] = React.useState('');

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
        if (global.connected === false) {
          global.setFaceStateCallback!(FaceStateEnum.HELP);
        } else {
          global.setFaceStateCallback!(FaceStateEnum.IDLE);

        }
      }
      return false; 
    });

  }, []);

  const passwordCheck = () => {
    if (password === '1166') {
      onChangePass('');
      router.push('/where/where');
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Password eingeben:</Text>
        <TextInput
            mode='outlined'
            style={styles.textField}
            secureTextEntry
            onChangeText={onChangePass}
            value={password}
            placeholder="Password"
        />
          <View style={styles.buttonContainer}>
            <Button onPress={() => passwordCheck() } style={styles.loginButton}  buttonColor='#426EB8' mode='elevated' dark><Text style={styles.loginButtonText}>Login</Text></Button>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#47ED87',
    flex: 1
  },
  text: {
    fontSize: 40,
    marginTop: 250,
  },
  loginButton: {
    height: 50,
  },
  loginButtonText: {
    paddingTop: 10,
    fontSize: 30,
    color: `white`,
  },
  textField: {
    width: '18%',
    height: 60,
    backgroundColor: 'white',
    fontSize: 30,
    marginTop: 30,
    textAlign:  'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  
  },
  buttonContainer: {
    marginTop: 500,
    flex: 1,
  }
});