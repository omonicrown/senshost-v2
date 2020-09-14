import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { PositiveResponse, GroupModel, ActuatorModel } from "../../interfaces/models";
import configs from "../../configs";


export class ActuatorLiveApis extends AxiosGlobal {
    getActuatorsFieldId(fieldId: string): AxiosPromise<Array<ActuatorModel>> {
        return this.axios.get(`${configs.context}/${configs.apiList.Actuators}/field/${fieldId}`);
    }
} 