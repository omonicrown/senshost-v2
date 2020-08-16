import { AxiosGlobal } from "../shared/axios";
import { AxiosPromise } from "axios";
import { GroupModel, UserModel } from "../../interfaces/models";
import configs from "../../configs";


export class UserLiveApis extends AxiosGlobal {
    createUser(user: UserModel): AxiosPromise<UserModel> {
        return this.axios.post(`${configs.context}/${configs.apiList.User}`, user);
    }

    getUsersByAccount(account: string): AxiosPromise<Array<UserModel>> {
        return this.axios.get(`${configs.context}/${configs.apiList.User}/account/${account}`);
    }
} 