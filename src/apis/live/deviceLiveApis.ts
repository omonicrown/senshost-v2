import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { Account, PositiveResponse, DeviceModel } from "../../interfaces/models";
import configs from "../../configs";


export class DeviceLiveApis extends AxiosGlobal {
    createDevice(device: DeviceModel): AxiosPromise<PositiveResponse> {
        return this.axios.post(`${configs.context}/${configs.apiList.DEVICE}`, device);
    }
} 