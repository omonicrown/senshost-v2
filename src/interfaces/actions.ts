import { Account } from "../apis/generated/api";
import { ErrorModel } from "./states";
import { AuthModel } from "./models";

import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

export interface AccountActions {
    type: string;
    error?: ErrorModel;
    account?: Account;
}

export interface AuthActions {
    type: string;
    error?: ErrorModel;
    auth?: AuthModel;
}

export interface NotificationActions {
    type: string;
    notification: NotificationProps
}