
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