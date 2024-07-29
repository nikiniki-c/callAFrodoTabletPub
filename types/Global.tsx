import { FaceStateEnum } from "@/constants/faceStateEnum";
import { MqttHandler } from "@/mqtt/mqttHandler";
import { Room } from "./roomType";
import { RobotStateDTO } from "./robotSateDTOType";
import { Mission } from "./missionDTO";

export interface GlobalType {
    mqttHandler: MqttHandler | null;
    initialized: boolean;
    robotId: string | null;
    faceState: FaceStateEnum | null;
    currentFloor: number | null;
    mission: Mission | null,
    selectedRoom: Room | null;
    connected: boolean | null;


    setFaceStateCallback: ((faceState: FaceStateEnum) => void) | null;
    setCurrentFloorCallback: ((currentLevel: number) => void) | null ;
    setMissionCallback: ((mission: Mission) => void) | null;


    updateGlobal: (mqttHandler: MqttHandler, uniqueId: string, faceStateCallBack: (faceState: FaceStateEnum) => void, setCurrentLevelCallback: (currentLevel: number) => void, setMissionCallBack: (mission: Mission) => void, currentFloor: number, faceState: FaceStateEnum, mission: Mission | null, connected: boolean) => void,

    getRobotStateDTO: () => RobotStateDTO | null;
    
}