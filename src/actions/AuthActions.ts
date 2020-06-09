import { States, ErrorModel } from '../interfaces/states';
import { Dispatch } from 'redux';
import * as constants from "../constants";
import { HttpBasicAuth } from '../apis/generated/api';
import { AuthApis } from '../apis/authApis';
import { AuthModel } from '../interfaces/models';
import { AuthActions } from '../interfaces/actions';


export function receiveAuth(auth: AuthModel): AuthActions {
    return { type: constants.RECEIVE_AUTH_USER, auth }
}

function logAuthError(error: ErrorModel): AuthActions {
    return { type: constants.LOG_AUTH_ERROR, error };
}
export function signoutUser(): AuthActions {
    return { type: constants.SIGNOUT_USER };
}

export function loginUser(auth: HttpBasicAuth) {
    return async (dispatch: Dispatch<AuthActions | any>, getState: () => States) => {
        try {
            const response = await AuthApis.login(auth);
            dispatch(receiveAuth(response.data));
        } catch (err) {
            logAuthError(err)
        }
    }
}
export type authActions = AuthActions;