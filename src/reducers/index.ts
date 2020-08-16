import auth from "./authReducer";
import notification from "./notificationReducer";
import groups from "./groupReducers";

import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    notification,
    groups
});
