import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { PositiveResponse, GroupModel, ActuatorModel } from "../../interfaces/models";
import configs from "../../configs";


export class ActuatorLiveApis extends AxiosGlobal {
    getActuatorsByDeviceId(deviceId: string): AxiosPromise<Array<ActuatorModel>> {
        return this.axios.get(`${configs.context}/${configs.apiList.Actuator}/device/${deviceId}`);
    }
} 