import { AxiosPromise } from "axios";
import configs from "../configs";
import { DashboardModel, PositiveResponse, DashboardItemModel } from "../interfaces/models";
import { DashboardLiveApis } from "./live/dashboardLiveApis";


export class DashboardApis {
    private static dashboardApis: DashboardLiveApis = new DashboardLiveApis();

    static getDashboardsByAccountId(accountId: string): AxiosPromise<Array<DashboardModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.getDashboardsByAccountId(accountId);
        }
    }

    static addDashboard(dashboard: DashboardModel): AxiosPromise<DashboardModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.addDashboard(dashboard);
        }
    }

    static editDashboardById(dashboard: DashboardModel): AxiosPromise<DashboardModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.editDashboardById(dashboard);
        }
    }

    static getDashboardById(id: string): AxiosPromise<DashboardModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.getDashboardById(id);
        }
    }

    static getDashboardItemsByDashboardId(dashboardId: string): AxiosPromise<Array<DashboardItemModel>> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.getDashboardItemsByDashboardId(dashboardId);
        }
    }

    static addDashboardItem(dashboardItem: DashboardItemModel): AxiosPromise<DashboardItemModel> {
        if (configs.type === "LOCAL") {
            return {} as AxiosPromise;
        } else {
            return this.dashboardApis.addDashboardItem(dashboardItem);
        }
    }
}