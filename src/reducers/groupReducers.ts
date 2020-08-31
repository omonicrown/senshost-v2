import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

import {
    RECEIVE_GROUPS
} from "../constants";
import { GroupState } from '../interfaces/states';
import { groupActions } from "../actions/groupActions";

const initialState: GroupState = {
    groups: [],
    isFetching: false,
    error: null,
};

export default (state = initialState, action: groupActions): GroupState => {
    switch (action.type) {
        case RECEIVE_GROUPS: {
            return { ...state, groups: [...state?.groups, ...action?.groups] };
        }
        default: {
            return state;
        }

    }

}