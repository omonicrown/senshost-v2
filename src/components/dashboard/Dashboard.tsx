import React from "react";
import { SharedProps } from "../home/Home";
import Gauge from "../gauge";
import { AccountState, States, AuthState } from "../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { AppRoutes } from "../../enums/routes";
import { Dispatch } from "redux";
import { History } from "history";
import { useHistory } from "react-router";
import { toggleNotification } from "../../actions";

export interface DashboardProps extends SharedProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = React.memo((props: DashboardProps): React.ReactElement<void> => {

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
        <div className="dashboard-container">
            <div className="row no-gutters">
                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="rectangle" data={[0.6]} />
                    </div>
                </div>

                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="circle" data={[0.5]} />
                    </div>
                </div>

                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="tears" data={[0.3]} />
                    </div>
                </div>
                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="tears" data={[0.3]} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Dashboard;