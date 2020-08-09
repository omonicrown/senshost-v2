
export interface AuthResponseModel {
    identityToken: string;
    account: Account;
}

export interface Account {
    username: string;
    email: string;
    password: string;
    id: string;
    creationDate: Date;
}

export interface HttpBasicAuth {
    username: string;
    password: string;
}

export interface PositiveResponse {
    code: 200 | 400 | 403 | 404;
    description: string;
}

export interface SensorModel {
    name: string;
    deviceId: string;
    dataType: number;
    id: string;
    creationDate: Date;
}

export interface ActuatorModel {
    deviceId: string;
    name: string;
    type: number
    propertise: { ON: "", OFF: ""};
    id: string;
    creationDate: Date;
}

export interface DeviceModel {
    name: string;
    type: number;
    connectionId: string;
    accountId: string;
    fields: Array<SensorModel>;
    groupId: string;
    widget: ActuatorModel;
    id: string;
    creationDate: Date;
}