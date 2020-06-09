import { AxiosPromise } from "axios";
import { AccountApi, AccountApiApiKeys, Account } from "./generated/api";
import { getAccessToken } from "../utils/tokenManagement";
import configs from "../configs";



export class AccountApis {
    static login(value: Account): AxiosPromise<Account> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            const api = new AccountApi("");
            api.setApiKey(AccountApiApiKeys.Bearer, getAccessToken());
            return api.post(value);
        }
    }
}