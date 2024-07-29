import { FaceStateEnum } from "@/constants/faceStateEnum";
import { Room } from "./roomType";
import { Mission } from "./missionDTO";



export interface RobotStateDTO {
    robotId: string,
    state: FaceStateEnum,
    floor: number,
    mission: Mission | null
}
