import { AuthState } from "../interfaces/states";
import { AuthResponseModel } from "../interfaces/models";
import { authActions } from "../actions";
import { RECEIVE_AUTH_USER, LOG_AUTH_ERROR, REQUEST_AUTH_USER, SIGNOUT_USER } from "../constants";



const initialState: AuthState = {
    isFetching: false,
    isAuthenticated: false,
    auth: {} as AuthResponseModel,
    error: null
};

export default (state: AuthState = initialState, action: authActions) => {
    switch (action.type) {
        case RECEIVE_AUTH_USER: {
            return {
                ...state,
                error: null,
                auth: action.auth,
                rememberMe: true,
                isAuthenticated: true,
                isFetching: false

            };
        }
        case LOG_AUTH_ERROR: {
            return { ...state, error: action.error, isFetching: false };
        }
        case REQUEST_AUTH_USER: {
            return { ...state, isFetching: true };
        }
        case SIGNOUT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                auth: null,
                isFetching: false,
                user: false
            };
        }
        default: {
            return state;
        }

    }

}