import { AxiosPromise } from "axios";
import configs from "../configs";
import { PositiveResponse, GroupModel, UserModel } from "../interfaces/models";
import { UserLiveApis } from "./live/userLiveApis";


export class UserApis {
    private static userApis: UserLiveApis = new UserLiveApis();

    static createUser(user: UserModel): AxiosPromise<UserModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.userApis.createUser(user);
        }
    }

    static updateUser(user: UserModel): AxiosPromise<UserModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.userApis.createUser(user);
        }
    }

    static getUsersByGroup(account: string): AxiosPromise<Array<UserModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.userApis.getUsersByAccount(account);
        }
    }
}