import { AxiosPromise } from "axios";
import configs from "../configs";
import { PositiveResponse, SensorModel } from "../interfaces/models";
import { SensorLiveApis } from "./live/sensorLiveApis";


export class SensorApis {
    private static sensorApis: SensorLiveApis = new SensorLiveApis();

    static getSensorsByDeviceId(deviceId: string): AxiosPromise<Array<SensorModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.sensorApis.getSensorsByDeviceId(deviceId);
        }
    }

    static updateSensorsByDeviceId(deviceId: string): AxiosPromise<Array<SensorModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.sensorApis.updateSensorsByDeviceId(deviceId);
        }
    }
}