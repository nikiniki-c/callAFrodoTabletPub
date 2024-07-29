import { FaceStateEnum } from "@/constants/faceStateEnum";
import { MqttHandler } from "@/mqtt/mqttHandler";
import { GlobalType } from "@/types/Global";
import { Mission } from "@/types/missionDTO";




export const global: GlobalType = {
    mqttHandler: null,
    robotId: null,
    faceState: null,
    currentFloor: null,
    mission: null,
    setFaceStateCallback: null,
    setCurrentFloorCallback: null,
    setMissionCallback: null,
    initialized: false,
    selectedRoom: null,
    connected: null,

    updateGlobal: (mqttHandler, robotId, faceStateCallBack, setCurrentFloorCallback, setMissionCallback, currentFloor, faceState, mission, connected) => {
        global.mqttHandler = mqttHandler;
        global.robotId = robotId;
        global.setFaceStateCallback = faceStateCallBack;
        global.setCurrentFloorCallback = setCurrentFloorCallback;
        global.currentFloor = currentFloor;
        global.faceState = faceState;
        global.mission = mission;
        global.setMissionCallback = setMissionCallback;
        global.connected = connected;

        //boolean für nen schnellern null check
        global.initialized = true;

    },

    getRobotStateDTO: () => {

        if (global.robotId == null || global.faceState == null || global.currentFloor == null) {
            return null;
        }

        return {
            robotId: global.robotId,
            state: global.faceState,
            floor: global.currentFloor,
            mission: global.mission === null ? null : global.mission
        }
    }
    
}