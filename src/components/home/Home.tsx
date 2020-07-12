import React from "react";
import { RouteComponentProps, Switch, Redirect } from "react-router";
import { AppRoute } from "../../utils/functions";
import { HomeRoutes } from "../../enums/routes";
import { History } from "history";

import SidebarComponent from "../shared/Sidebar";
import HeaderComponent from "../shared/Header";
import { AuthState } from "../../interfaces/states";
import { actionTypes } from "../../types";

import RequireLoginComponent from "../shared/RequireLogin";
import { Button } from "@sebgroup/react-components/dist/Button";
import { ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";

const Devices: any = React.lazy(() => import("../devices/Devices"));
const NotFound: React.LazyExoticComponent<React.FunctionComponent<RouteComponentProps>> = React.lazy(() => import("../notFound/404"));


const initialState: ModalProps = {
  toggle: false,
  fullscreen: false,
  position: null,
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

export interface AddModalToggleProps extends ModalProps {
  setToggle: (value?: boolean) => void;
}

export const toggleAddModalContext = React.createContext<AddModalToggleProps>({
  ...initialState,
  setToggle: () => { }
})

const Home: React.FunctionComponent<SharedProps> = React.memo((props: HomeProps): React.ReactElement<void> => {
  const [toggleMenu, setMenuToggle] = React.useState<boolean>(false);
  const [toggleAddModal, setToggleAddModal] = React.useState<ModalProps>({ ...initialState });

  const onToggle = React.useCallback((e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => {
    setMenuToggle(!toggleMenu)
  }, [toggleMenu]);

  const setToggle = React.useCallback((value?: boolean) => {
    setToggleAddModal({ ...toggleAddModal, toggle: value })
  }, [toggleAddModal]);

  return (
    <toggleAddModalContext.Provider value={{ ...toggleAddModal, setToggle: setToggle }}>
      <div className="home-container container-fluid">
        <div className="row no-gutters">
          <HeaderComponent />
        </div>
        <div className="row no-gutters main-body">
          <SidebarComponent onToggle={onToggle} toggle={toggleMenu} />
          <main className={"main-container col" + (toggleMenu ? " sidemenu-opened" : " sidemenu-closed")} role="main">
            <div className="inner-bar d-flex">
              <Button label="Add" id="addBtn" onClick={() => setToggle(!toggleAddModal.toggle)} theme="outline-primary" />
            </div>
            <div className="main-holder">
              <div className="container">
                <Switch>
                  <Redirect
                    exact
                    from="/home"
                    to={HomeRoutes.Devices.toString()}
                  />
                  <AppRoute
                    path={HomeRoutes.Devices.toString()}
                    component={RequireLoginComponent(Devices)}
                  />
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
    </toggleAddModalContext.Provider>
  );

});

export default Home;

