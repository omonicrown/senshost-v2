import { ErrorModel } from "./states";
import { AuthResponseModel } from "./models";

import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";


export interface AccountActions {
    type: string;
    error?: ErrorModel;
    account?: Account;
}

export interface AuthActions {
    type: string;
    error?: ErrorModel;
    auth?: AuthResponseModel;
}

export interface NotificationActions {
    type: string;
    notification: NotificationProps
}