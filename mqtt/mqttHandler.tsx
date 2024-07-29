
import * as Paho from 'paho-mqtt';
import { global } from "@/utils/global";
import { FaceStateEnum } from '@/constants/faceStateEnum';


export class MqttHandler {

  client: Paho.Client;
  isConnected: boolean = false;
  setConnectedCallback: ((connected: boolean) => void) | null = null;
  reconnecting = false;

  constructor(brokerUrl: string, clientId: string, setConnectedCallback: (connected: boolean) => void){
    this.client = new Paho.Client(brokerUrl, clientId);
    this.setConnectedCallback = setConnectedCallback;
    this.client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('Connection lost:', responseObject.errorMessage);
        this.isConnected = false;

        setConnectedCallback(false);

        if (global.faceState === FaceStateEnum.IDLE) {
          global.setFaceStateCallback!(FaceStateEnum.HELP);
        }
        
        this.connectToMqttBroker();
      }
    };

    this.client.onMessageArrived = (message) => {
      console.log('Message arrived:', message.payloadString);
    };
  }

  onConnectSuccess() {
    console.log('Connected');
    this.isConnected = true;
    this.setConnectedCallback!(true);
    if (global.faceState === FaceStateEnum.HELP) {
      global.setFaceStateCallback!(FaceStateEnum.IDLE);
    }
  };

  onConnectFailure(error: any) {
    console.error('Connection failed:', error.errorMessage);
    this.isConnected = false;
    this.setConnectedCallback!(false);
  };

  connectToMqttBroker() {
    console.log('Connecting...');

    const clientOptions = {
      onSuccess: () => {
        this.onConnectSuccess();
      },
      onFailure: () => {
        console.log("Connection failed");
        console.log("Trying to Reconnect...");

        setTimeout(() => {
          this.connectToMqttBroker();
        }, 5000);
      },
      useSSL: false
    }

    this.client.connect(clientOptions);
  };

  sendMessage(topic: string, message: string) {
    console.log("sendMessage aufgerufen: ");
    

    //TODO: Fail Save einbauen, er muss sich reconnecten
    if (!this.client.isConnected()) {
      console.log('Client is not connected');
      return;
    }

      
    const messageObject = new Paho.Message(message);

    messageObject.destinationName = topic;
    messageObject.qos = 1;

    console.log("Nachricht wird gesendet");
    this.client.send(messageObject);
   
  }

  subscribeToTopic(topic: string) {
    this.client.subscribe(topic, {
      onSuccess: () => {
        console.log('Subscribed to topic:', topic);
      },
      onFailure: (error) => {
        console.error('Subscription failed:', error.errorMessage);
      }
    });
  }

  
}