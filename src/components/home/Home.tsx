import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes, AppRoutes, ViewDeviceRoutes } from "../../enums/routes";
import { History } from "history";

import SidebarComponent from "../shared/Sidebar";
import HeaderComponent from "../shared/Header";
import { AuthState, States } from "../../interfaces/states";
import { actionTypes } from "../../types";

import { DashboardProps } from "../dashboard/Dashboard";
import { DevicesProps } from "../devices/Devices";

import { GroupsProps } from "../groups/Groups";
import { UsersProps } from "../users/Users";
import { ViewDeviceProps } from "../viewDevice/ViewDevice";
import { RulesHolderProps } from "../rules/Rules";

import { useSelector, useDispatch } from "react-redux";
import { getGroupsByAccount } from "../../actions/groupActions";
import { getDevicesByAccount } from "../../actions/deviceActions";

import "../../styles/components/shared/modal.scss";


const Devices: React.LazyExoticComponent<React.FC<DevicesProps>> = React.lazy(() => import("../devices/Devices"));
const Dashbaord: React.LazyExoticComponent<React.FC<DashboardProps>> = React.lazy(() => import("../dashboard/Dashboard"));
const DashbaordItem: React.LazyExoticComponent<React.FC<DashboardProps>> = React.lazy(() => import("../dashboardItem/DashboardItem"));

const Groups: React.LazyExoticComponent<React.FC<GroupsProps>> = React.lazy(() => import("../groups/Groups"));
const Users: React.LazyExoticComponent<React.FC<UsersProps>> = React.lazy(() => import("../users/Users"));
const Actions: React.LazyExoticComponent<React.FC<UsersProps>> = React.lazy(() => import("../actions/Actions"));
const Rules: React.LazyExoticComponent<React.FC<RulesHolderProps>> = React.lazy(() => import("../rules/Rules"));

const ViewDevice: React.LazyExoticComponent<React.FC<ViewDeviceProps>> = React.lazy(() => import("../viewDevice/ViewDevice"));
const NotFound: React.LazyExoticComponent<React.FC<RouteComponentProps>> = React.lazy(() => import("../notFound/404"));

export interface SharedProps {
  history?: History;
  authState?: AuthState;
  actions?: actionTypes;
}

interface HomeProps extends RouteComponentProps {

}


const Home: React.FunctionComponent<SharedProps> = React.memo((props: HomeProps): React.ReactElement<void> => {
  const [toggleMenu, setMenuToggle] = React.useState<boolean>(false);
  const authState = useSelector((states: States) => states.auth);
  const dispatch = useDispatch();

  const onToggle = React.useCallback((e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => {
    setMenuToggle(!toggleMenu);

    e.preventDefault();
  }, [toggleMenu, setMenuToggle]);

  React.useEffect(() => {
    dispatch(getGroupsByAccount(authState?.auth?.account?.id));
    dispatch(getDevicesByAccount(authState?.auth?.account?.id));
  }, []);

  return (
    <div className="home-container">
      <div className="row no-gutters">
        <HeaderComponent onToggle={onToggle} toggle={toggleMenu} />
      </div>
      <div className="row no-gutters main-body">
        <SidebarComponent toggle={toggleMenu} />
        <main className={"main-container col" + (toggleMenu ? " sidemenu-opened" : " sidemenu-closed")} role="main">
          <div className="main-holder">
            <div className="container-fluid">
              <Switch>
                <Redirect
                  exact
                  from={AppRoutes.Home}
                  to={HomeRoutes.Dashboard.toString()}
                />
                <AppRoute
                  path={HomeRoutes.Dashboard.toString()}
                  exact
                  component={Dashbaord}
                />
                <AppRoute
                  path={HomeRoutes.DashboardItem.toString()}
                  component={DashbaordItem}
                />
                <AppRoute
                  path={HomeRoutes.Devices.toString()}
                  exact={true}
                  component={Devices}
                />

                <AppRoute
                  path={ViewDeviceRoutes.ViewDevice.toString()}
                  exact={true}
                  component={ViewDevice}
                />

                <AppRoute
                  path={HomeRoutes.Actions.toString()}
                  exact={true}
                  component={Actions}
                />

                <AppRoute
                  path={HomeRoutes.Rules.toString()}
                  exact={true}
                  component={Rules}
                />

                <AppRoute
                  path={HomeRoutes.Groups.toString()}
                  component={Groups}
                />

                <AppRoute path={HomeRoutes.Users.toString()} component={Users} />

                <AppRoute path="*" component={NotFound} props={props} />

              </Switch>
            </div>

            <footer className="footer-container">
              Copyright © 2019 Senshost. All rights reserved.
              </footer>
          </div>
        </main>
      </div>
    </div>
  );

});

export default Home;

