import { AxiosPromise } from "axios";
import configs from "../configs";
import { PositiveResponse, DeviceModel } from "../interfaces/models";
import { DeviceLiveApis } from "./live/deviceLiveApis";

export class DeviceApis {
    private static deviceApis: DeviceLiveApis = new DeviceLiveApis();

    static createDevice(device: DeviceModel): AxiosPromise<PositiveResponse> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.deviceApis.createDevice(device);
        }
    }

    static updateDevice(device: DeviceModel): AxiosPromise<PositiveResponse> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.deviceApis.createDevice(device);
        }
    }
}