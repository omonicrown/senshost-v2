import { AuthResponseModel, Account, GroupModel } from "./models";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

export interface ErrorModel {
    message: string;
    type: string;
}

interface IReducer {
    isFetching: boolean;
    error: ErrorModel
}

export interface AccountState {
    token: string;
    isAuthenticated: boolean;
    account: Account;
}
export interface NotificationState {
    notification: NotificationProps;
}

export interface AuthState extends IReducer {
    isAuthenticated: boolean;
    auth: AuthResponseModel;
}

export interface GroupState extends IReducer {
    groups: Array<GroupModel>;
}

export interface States {
    account: AccountState;
    auth: AuthState;
    notification: NotificationState;
    groups: GroupState;
}