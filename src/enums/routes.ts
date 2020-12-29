


export enum AppRoutes {
    Home = "/home",
    Account = "/account",
}

export enum HomeRoutes {
    Devices = AppRoutes.Home + "/devices",
    Dashboard = AppRoutes.Home + "/dashboard",
    DashboardItem = AppRoutes.Home + "/dashboard/:id",
    Groups = AppRoutes.Home + "/groups",
    Users = AppRoutes.Home + "/users"
}

export enum ViewDeviceRoutes {
    ViewDevice = HomeRoutes.Devices + "/:deviceId",
}