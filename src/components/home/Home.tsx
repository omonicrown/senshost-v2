import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes, AppRoutes } from "../../enums/routes";
import { History } from "history";

import SidebarComponent from "../shared/Sidebar";
import HeaderComponent from "../shared/Header";
import { AuthState, States } from "../../interfaces/states";
import { actionTypes } from "../../types";

import { DashboardProps } from "../dashboard/Dashboard";
import { DevicesProps } from "../devices/Devices";

import { Button } from "@sebgroup/react-components/dist/Button";
import { ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { GroupsProps } from "../groups/Groups";
import { UsersProps } from "../users/Users";

import { GroupApis } from "../../apis/groupApis";
import { useSelector, useDispatch } from "react-redux";
import { GroupModel } from "../../interfaces/models";
import { AxiosResponse, AxiosError } from "axios";
import { getGroupsByAccount } from "../../actions/groupActions";

const Devices: React.LazyExoticComponent<React.FC<DevicesProps>> = React.lazy(() => import("../devices/Devices"));
const Dashbaord: React.LazyExoticComponent<React.FC<DashboardProps>> = React.lazy(() => import("../dashboard/Dashboard"));
const Groups: React.LazyExoticComponent<React.FC<GroupsProps>> = React.lazy(() => import("../groups/Groups"));
const Users: React.LazyExoticComponent<React.FC<UsersProps>> = React.lazy(() => import("../users/Users"));

const NotFound: React.LazyExoticComponent<React.FC<RouteComponentProps>> = React.lazy(() => import("../notFound/404"));


const initialState: ModalProps = {
  toggle: false,
  fullscreen: false,
  centered: false,
  size: "modal-lg",
  disableBackdropDismiss: true,
  onDismiss: null,
};


export interface SharedProps {
  history?: History;
  authState?: AuthState;
  actions?: actionTypes;
}

interface HomeProps extends RouteComponentProps {

}

interface HomeStates {
  toggle: boolean;
  onToggleAdd?: (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => void;
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
    dispatch(getGroupsByAccount(authState?.auth?.account?.id))
}, []);

  return (
      <div className="home-container container-fluid">
        <div className="row no-gutters">
          <HeaderComponent onToggle={onToggle} toggle={toggleMenu} />
        </div>
        <div className="row no-gutters main-body">
          <SidebarComponent toggle={toggleMenu} />
          <main className={"main-container col" + (toggleMenu ? " sidemenu-opened" : " sidemenu-closed")} role="main">
            <div className="main-holder">
              <div className="container">
                <Switch>
                  <Redirect
                    exact
                    from={AppRoutes.Home}
                    to={HomeRoutes.Dashboard.toString()}
                  />
                  <AppRoute
                    path={HomeRoutes.Dashboard.toString()}
                    component={Dashbaord}
                  />
                  <AppRoute
                    path={HomeRoutes.Devices.toString()}
                    component={Devices}
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

