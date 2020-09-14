import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { PositiveResponse, GroupModel, SensorModel } from "../../interfaces/models";
import configs from "../../configs";


export class SensorLiveApis extends AxiosGlobal {
    getSensorsByDeviceId(deviceId: string): AxiosPromise<Array<SensorModel>> {
        return this.axios.get(`${configs.context}/${configs.apiList.Sensor}/device/${deviceId}`);
    }
} 