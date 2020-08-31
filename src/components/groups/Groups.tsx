import React from "react";
import { SharedProps } from "../home/Home";

import GroupHolder from "./sections/GroupHolder";
import UsersHolder from "./sections/UsersHolder";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { States, AuthState } from "../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useHistory } from "react-router";
import { AppRoutes } from "../../enums/routes";
import { toggleNotification } from "../../actions";
import { History } from "history";

export interface GroupProps extends SharedProps {
}

const Groups: React.FunctionComponent<GroupProps> = (props: GroupProps): React.ReactElement<void> => {

  const authState: AuthState = useSelector((states: States) => states?.auth);
  const dispatch: Dispatch = useDispatch();

  const history: History = useHistory();

  React.useEffect(() => {
    if (!authState?.auth?.identityToken) {
      const notification: NotificationProps = {
        theme: "danger",
        title: "Unauthenticated user",
        message: `Please login to proceed`,
        onDismiss: () => { },
        toggle: true
      };

      dispatch(toggleNotification(notification));
      history.replace(AppRoutes.Account);
    }
  }, [authState]);

  return (
    <div className="group-users-container">
      <div className="row">
        <div className="col-sm-6 col-12">
          <GroupHolder />
        </div>

        <div className="col-sm-6 col-12">
          <UsersHolder />
        </div>
      </div>
    </div>
  );

};

export default Groups;
