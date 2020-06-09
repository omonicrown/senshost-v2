import { AxiosPromise } from "axios";
import { AuthApiApiKeys, AuthApi, HttpBasicAuth } from "./generated/api";
import { getAccessToken } from "../utils/tokenManagement";
import configs from "../configs";
import { AuthModel } from "../interfaces/models";



export class AuthApis {
    private static authApi: AuthApi = new AuthApi("");
    private static httpBasicAuth: HttpBasicAuth = new HttpBasicAuth();
    static login(value: HttpBasicAuth): AxiosPromise<AuthModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            this.httpBasicAuth.password = value.password;
            this.httpBasicAuth.username = value.username;
            return this.authApi.login();
        }
    }
}