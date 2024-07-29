
import { View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { Link, useRouter } from "expo-router";


export default function Confirmation() {

  

  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/images/confirm.gif')} />
      <Link href="/" asChild>
        <Button style={styles.button} buttonColor="#538569" mode="elevated" labelStyle={styles.buttonText}> Akzeptieren </Button>
      </Link>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {

  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  }

})