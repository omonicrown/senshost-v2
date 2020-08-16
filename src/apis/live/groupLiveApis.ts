import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { PositiveResponse, GroupModel } from "../../interfaces/models";
import configs from "../../configs";


export class GroupLiveApis extends AxiosGlobal {
    createGroup(device: GroupModel): AxiosPromise<GroupModel> {
        return this.axios.post(`${configs.context}/${configs.apiList.Group}`, device);
    }

    getGroupByAccount(account: string): AxiosPromise<Array<GroupModel>> {
        return this.axios.get(`${configs.context}/${configs.apiList.Group}/account/${account}`);
    }
} 