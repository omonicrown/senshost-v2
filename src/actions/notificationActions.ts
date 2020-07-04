import * as constants from '../constants';
import { NotificationActions } from '../interfaces/actions';
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

export function toggleNotification(notification: NotificationProps): NotificationActions {
    console.log("Its dispatching ", notification)
    return { 
        type: constants.TOGGLE_NOTIFICATION, 
        notification,
    }
}

export type notificationActions = NotificationActions;