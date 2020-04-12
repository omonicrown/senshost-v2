import { createHashHistory } from 'history';
import { node } from 'prop-types';

//API CALL TYPE
const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";

//resources
const SOCKET_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3003";
//API contexts
//We will pass this to swagger class constractor if we need different base urls
const DEFAULT = '';
const SECONDARY = '/something';



//CONFIG DATA (Please change here only)
const configs = {
    delay: 500,
    appName: "nametalkam",
    toastDelay: 5000,
    tokenStorage:"TOKEN_PERSIST",
    socket: SOCKET_URL,
    type: TYPE_REST,
    context: SOCKET_URL,
    requestTimeOut: 30000,
}
export default configs;
