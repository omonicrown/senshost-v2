import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel";
import React from "react";
import { DashboardItemModel } from "../../../../interfaces/models";
import { AuthState } from "../../../../interfaces/states";


interface DashboardItemSummaryProps {
    loading: boolean;
    selectedDeviceSource?: DropdownItem;
    selectedDevice: DropdownItem;
    selectedDeviceSensor: DropdownItem;
    selectedDataSourceType: "device" | "aggregateField";
    authState: AuthState;
    dashboardItem: DashboardItemModel;
    selectedDashboardItemType: DropdownItem;
}

const DashboardItemSummary: React.FC<DashboardItemSummaryProps> = (props: DashboardItemSummaryProps): React.ReactElement<void> => {
    console.log("The chages are ", props);
    return (
        <React.Fragment>
            <div className="card">
                <div className={"card-body" + (!props.dashboardItem?.name ? " skeleton-loader" : "")}>
                    <h4 className="card-title">Dashboard Item</h4>
                    <div className="row">
                        <div className="col">
                            <TextLabel label="Item name" value={props?.dashboardItem?.name} />
                        </div>
                        <div className="col">
                            <TextLabel label="Item type" value={props.selectedDashboardItemType.label} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card my-2">
                <div className={"card-body" + (!props.dashboardItem?.name ? " skeleton-loader" : "")}>
                    <h4 className="card-title">Datasource</h4>
                    {props.selectedDataSourceType === "device" ?
                        <React.Fragment>
                            <div className="row">
                                <div className="col">
                                    <TextLabel label="Device" value={props.selectedDevice?.label} />
                                </div>
                                <div className="col">
                                    {props.selectedDeviceSource.value === "sensors" ?
                                        <TextLabel label="Sensor" value={props.selectedDeviceSensor.label} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        null
                    }
                </div>
            </div>
        </React.Fragment>
    );

};


export default DashboardItemSummary;