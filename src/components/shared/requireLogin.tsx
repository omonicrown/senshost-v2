import * as React from "react";
import { navigate } from '../../utils/navigateUtil';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { SharedProps } from "../home/Home";
import { AppRoutes } from "../../enums/routes";
import { States } from "../../interfaces/states";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

interface RequireLoginComponentProps extends SharedProps {

}

export default function (ComposedComponent: typeof React.Component | React.LazyExoticComponent<any>) {

    class RequireLoginComponent extends React.PureComponent<RequireLoginComponentProps, {}> {

        constructor(props: RequireLoginComponentProps) {
            super(props);
        }

        componentDidMount() {
            console.log("Destroy his opponent ", this.props);
            if (this.props.authState && (!this.props.authState.isAuthenticated || !this.props.authState?.auth?.account)) {
                const notification: NotificationProps = {
                    theme: "danger",
                    title: "Unauthenticated user",
                    message: `Please login to proceed`,
                    onDismiss: () => { },
                    toggle: true
                };
                this.props.actions && this.props.actions.toggleNotification(notification);
                navigate(AppRoutes.Account, true);
            }
        };

        componentDidUpdate(prevProps: RequireLoginComponentProps) {
            if (this.props.authState && (!this.props.authState.isAuthenticated || !this.props.authState?.auth?.account)) {
                const notification: NotificationProps = {
                    theme: "danger",
                    title: "Unauthenticated user",
                    message: `Please login to proceed`,
                    onDismiss: () => { },
                    toggle: true
                };
                this.props.actions && this.props.actions.toggleNotification(notification);
                navigate(AppRoutes.Account, true);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapDispatchToProps = (dispatch: Dispatch) => {
        return {
            actions: bindActionCreators(actions, dispatch)
        }
    };

    const mapStateToProps = (states: States) => {
        return {
            authState: states.auth
        }
    };

   return connect(mapStateToProps, mapDispatchToProps)(RequireLoginComponent);
}