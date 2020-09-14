import { AxiosPromise } from "axios";
import configs from "../configs";
import { PositiveResponse, ActuatorModel } from "../interfaces/models";
import { ActuatorLiveApis } from "./live/actuatorLiveApis";


export class ActuatorApis {
    private static actuatorApis: ActuatorLiveApis = new ActuatorLiveApis();

    static getActuatorsByDeviceId(deviceId: string): AxiosPromise<Array<ActuatorModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.actuatorApis.getActuatorsByDeviceId(deviceId);
        }
    }
}