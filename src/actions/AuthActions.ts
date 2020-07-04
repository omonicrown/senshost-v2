import { States, ErrorModel } from '../interfaces/states';
import { Dispatch } from 'redux';
import * as constants from "../constants";
import { AuthApis } from '../apis/authApis';
import { AuthResponseModel, HttpBasicAuth } from '../interfaces/models';
import { AuthActions } from '../interfaces/actions';


export function receiveAuth(auth: AuthResponseModel): AuthActions {
    return { type: constants.RECEIVE_AUTH_USER, auth }
}

export function logAuthError(error: ErrorModel): AuthActions {
    return { type: constants.LOG_AUTH_ERROR, error };
}
export function signoutUser(): AuthActions {
    console.log("It has been loggout out");
    return { type: constants.SIGNOUT_USER };
}


export type authActions = AuthActions;