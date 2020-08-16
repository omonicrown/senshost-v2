import { createBrowserHistory } from 'history';

//API CALL TYPE
const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";

//resources
const SOCKET_URL = process.env.NODE_ENV === "production" ? "" : "http://204.93.161.215:8000/api";
//API contexts
//We will pass this to swagger class constractor if we need different base urls
const DEFAULT = '';
const SECONDARY = '/something';

export enum APILIST {
    AUTH = "Auth",
    ACCOUNT = 'Account',
    DEVICE = 'Device',
    Group = 'Group',
    User = 'User',
}

//CONFIG DATA (Please change here only)
const configs = {
    delay: 500,
    appName: "senhost",
    toastDelay: 5000,
    tokenStorage: "TOKEN_PERSIST",
    socket: SOCKET_URL,
    type: TYPE_REST,
    context: SOCKET_URL,
    history: createBrowserHistory(),
    requestTimeOut: 30000,
    apiList: APILIST,
    tablePageSize: 10
}
export default configs;
