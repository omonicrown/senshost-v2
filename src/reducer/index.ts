import auth from "./authReducer";
import notification from "./notificationReducer";

import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    notification
});
