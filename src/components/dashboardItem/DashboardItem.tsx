import { Modal, ModalProps } from '@sebgroup/react-components/dist/Modal/Modal';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardApis } from '../../apis/dashboardApis';
import { ChartType, initialState } from '../../constants';
import { DashboardItemModel, DashboardModel } from '../../interfaces/models';
import { States } from '../../interfaces/states';
import { Dispatch } from "redux";
import { History } from "history";

import Gauge from "../shared/Gauge";
import Tank from "../shared/Tank";
import LineChart from "../shared/LineChart";
import BarGraph from "../shared/BarGraph";
import PieChart from "../shared/PieChart";
import Doughnut from "../shared/Doughnut";

import { toggleNotification } from '../../actions';
import { NotificationProps } from '@sebgroup/react-components/dist/notification/Notification';
import { match, useHistory, useRouteMatch } from 'react-router';
import { Breadcrumb } from '@sebgroup/react-components/dist/Breadcrumb/Breadcrumb';
import { Button } from '@sebgroup/react-components/dist/Button';
import { HomeRoutes } from '../../enums/routes';
import PortalComponent from '../shared/Portal';

import AddDashboardItem from "./modals/AddDashboardItem";

import { convertStringToJson } from '../../utils/functions';
import CardAction from './modals/CardAction';

export interface PropertyItem {
    propertyName: string;
    propertyValue: string;
    propertyLabel: string;
    otherProperty?: string;
}

interface BreadcrumbProps {
    list: Array<string>;
    activeIndex: number;
}

const DashboardItem: React.FC = () => {
    const [dashboardItems, setDashboardItems] = React.useState<Array<DashboardItemModel>>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [toggleAction, setToggleAction] = React.useState<boolean>(false);

    const [fetching, setFetching] = React.useState<boolean>(false);
    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState, size: 'modal-lg' });

    const [dashboard, setDashboard] = React.useState<DashboardModel>(null);
    const [dashboardItem, setDashboardItem] = React.useState<DashboardItemModel>(null);

    const match: match = useRouteMatch();
    const history: History = useHistory();

    const dashboardId: string = React.useMemo(() => match?.params["id"], [match?.params]);

    const breadcrumbList: Array<string> = React.useMemo(() => {
        return ['Dashboard list', dashboard?.name || dashboardId];
    }, [dashboardId, dashboard]);

    const onEditDashboardItem = React.useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, dashboardItem: DashboardItemModel) => {
        setDashboardItem(dashboardItem);
        setModalProps({ ...modalProps, toggle: true });
    }, [modalProps]);

    const onDeleteDashboardItem = React.useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, dashboardItem: DashboardItemModel) => {
        setDashboardItem(dashboardItem);
        setModalProps({ ...modalProps, toggle: true });
    }, [modalProps]);

    const onAddDashboardItem = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDashboardItem(null);
        setModalProps({ ...modalProps, toggle: true });
    }, [modalProps]);

    const onBreadcrumbClick = React.useCallback((i: number) => {
        if (i === 0) {
            history.push(HomeRoutes.Dashboard.toString());
        }
    }, [history]);

    const arrayTemp: Array<number> = React.useMemo(() => [1, 2, 3, 4], []);

    const authState = useSelector((states: States) => states.auth);
    const dispatch: Dispatch = useDispatch();

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalProps({ ...modalProps, toggle: false });
    }, [modalProps]);

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, dashboardItem: DashboardItemModel) => {
        setDashboardItems([...dashboardItems, dashboardItem]);
        const notification: NotificationProps = {
            theme: "success",
            title: "Dashboard item added",
            message: `Dashboard item added successfully`,
            toggle: true,
            onDismiss: () => { }
        };
        dispatch(toggleNotification(notification));
        setModalProps({ ...modalProps, toggle: false });

    }, [dashboardItems, modalProps]);


    React.useEffect(() => {
        setFetching(true);
        DashboardApis.getDashboardItemsByDashboardId(dashboardId)
            .then((response: AxiosResponse<Array<DashboardItemModel>>) => {
                if (response.data) {
                    setDashboardItems(response.data);
                }
            })
            .finally(() => {
                setFetching(false);
            });

        DashboardApis.getDashboardById(dashboardId)
            .then((response: AxiosResponse<DashboardModel>) => {
                if (response.data) {
                    setDashboard(response.data);
                }
            })
            .finally(() => {
                setFetching(false);
            });

    }, [dashboardId]);

    const renderCharts = (dashboardItem: DashboardItemModel, index: number) => {
        const chartProperties: Array<PropertyItem> = convertStringToJson<Array<PropertyItem>>(dashboardItem?.property);
        if (!Array.isArray(chartProperties)) return null;
        switch (dashboardItem.type) {
            case ChartType.Tank:
                return <Tank type={index % 2 === 0 ? "tears" : 'rectangle'} name={dashboardItem.name} data={chartProperties} />;
            case ChartType.Gauge:
                return <Gauge data={chartProperties} name={dashboardItem.name} />;
            case ChartType.LineGraph:
                return <LineChart data={chartProperties} />;
            case ChartType.BarGraph:
                return <BarGraph data={chartProperties} />;
            case ChartType.PieChart:
                return <PieChart data={chartProperties} name={dashboardItem.name} />;
            case ChartType.Doughnut:
                return <Doughnut data={chartProperties} name={dashboardItem.name} />;
            default:
                return <PieChart data={chartProperties} name={dashboardItem.name} />;
        }
    };

    return (
        <div className="dashboard-item-container" onClick={() => { setToggleAction(!toggleAction); }}>
            <Breadcrumb className="dashboard-breadcrumb" id="2" list={breadcrumbList} onClick={onBreadcrumbClick} />
            <div className="d-flex flex-sm-row flex-column dashboards-holder">
                {fetching ? arrayTemp.map((key: number) =>
                    <div className="card dashboard-card" key={`loader${key}`}>
                        <div className="skeleton-loader skeleton-loader-fill rounded " />
                    </div>
                ) :
                    dashboardItems.length ?
                        dashboardItems?.map((dashboardItem: DashboardItemModel, index: number) =>
                            <div className="card dashboard-card" key={dashboardItem?.id}>
                                <h4 className="card-header">
                                    {dashboardItem.name}
                                    <div className="float-right">
                                        <CardAction
                                            toggle={toggleAction}
                                            onDeleteCardItem={onDeleteDashboardItem}
                                            onEditCardItem={onEditDashboardItem}
                                            dashboardItem={dashboardItem}
                                        />
                                    </div>
                                </h4>
                                <div className="card-body">
                                    <div className="chart-holder">
                                        {renderCharts(dashboardItem, index)}
                                    </div>
                                </div>
                                <div className="card-footer text-muted">
                                    Created: {dashboardItem?.creationDate}
                                </div>
                            </div>
                        ) :
                        <div className="card dashboard-card empty-card">
                            <span className="text-primary text-primary">
                                Dashboard empty
                            </span>
                        </div>

                }

                <div className="card dashboard-card">
                    <Button disabled={loading || fetching} className="card-body" theme="outline-primary" label="Add" size="sm" name="btnAdd" onClick={onAddDashboardItem} />
                </div>
            </div>

            <PortalComponent>
                <Modal
                    {...modalProps}
                    onDismiss={() => setModalProps({ ...modalProps, toggle: false })}
                    header={<h4>{dashboardItem?.id ? `Edit ${dashboardItem?.name}` : 'Add Dashboard Item'}</h4>}
                    body={
                        modalProps?.toggle ?
                            <AddDashboardItem
                                onSave={handleSave}
                                onCancel={onCancel}
                                loading={loading}
                                dashboardItem={dashboardItem}
                                authState={authState}
                                dashboardId={dashboardId}
                            />

                            : null
                    }
                />
            </PortalComponent>
        </div >
    );
};

export default DashboardItem;