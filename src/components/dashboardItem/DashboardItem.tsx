import { ModalProps } from '@sebgroup/react-components/dist/Modal/Modal';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardApis } from '../../apis/dashboardApis';
import { initialState } from '../../constants';
import { DashboardItemModel, DashboardModel } from '../../interfaces/models';
import { States } from '../../interfaces/states';
import { Dispatch } from "redux";

import Gauge from "../gauge";
import { toggleNotification } from '../../actions';
import { NotificationProps } from '@sebgroup/react-components/dist/notification/Notification';
import { match, useHistory, useRouteMatch } from 'react-router';

const DashboardItem: React.FC = () => {
    const [dashboardItems, setDashboardItems] = React.useState<Array<DashboardItemModel>>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

    const match: match = useRouteMatch();

    const arrayTemp: Array<number> = React.useMemo(() => [1, 2, 3, 4], []);

    const authState = useSelector((states: States) => states.auth);
    const dispatch: Dispatch = useDispatch();

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalProps({ ...modalProps, toggle: false });
    }, [modalProps]);

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, dashboardItem: DashboardItemModel) => {
        setLoading(true);
        DashboardApis.addDashboardItem(dashboardItem)
            .then((response: AxiosResponse) => {
                console.log("The response is ", dashboardItem)
                setDashboardItems([...dashboardItems, response.data]);

                const notification: NotificationProps = {
                    theme: "success",
                    title: "Dashboard item added",
                    message: `Dashboard item added successfully`,
                    toggle: true,
                    onDismiss: () => { }
                };

                dispatch(toggleNotification(notification));

                setModalProps({ ...modalProps, toggle: false });
            }).finally(() => {
                setLoading(false);
            });
    }, [dashboardItems]);

    React.useEffect(() => {
        setFetching(true);
        DashboardApis.getDashboardItemsByDashboardId(match?.params["id"])
            .then((response: AxiosResponse<Array<DashboardItemModel>>) => {
                if (response.data) {
                    setDashboardItems(response.data);
                }
            })
            .finally(() => {
                setFetching(false);
            });

    }, []);

    return (
        <div className="dashboard-item-container">
            <div className="row no-gutters">
                <div className="col-sm-3 col-12">
                    <div className="card">
                        <div className="card-header">
                            header here
                        </div>
                        <div className="card-body">
                            <Gauge type="rectangle" data={[0.6]} />
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
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
        </div >
    );
};

export default DashboardItem;