import { Button } from "@sebgroup/react-components/dist/Button";
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { StepTracker } from "@sebgroup/react-components/dist/StepTracker";

import React from "react";
import { ChartType } from "../../../constants";
import { DashboardItemModel } from "../../../interfaces/models";
import { AuthState } from "../../../interfaces/states";
import { icontypesEnum, SvgElement } from "../../../utils/svgElement";

import DataSourcesSection from "./sections/DataSources";
import ItemPropertySection from "./sections/ItemProperty";
import DashabordItemSummarySection from "./sections/DashboardItemSummary";
import { DashboardApis } from "../../../apis/dashboardApis";
import { AxiosResponse } from "axios";

export interface DashboardPropertiesOptions {
    type: number;
    properties: Array<DropdownItem<string>>;
}

export interface AddDashboardItemControls {
    name: string;
    type: DropdownItem;
    tankProperties: {
        capacity: number;
    };
    gaugeProperties: {
        min: number;
        max: number;
    };
    chartProperties: {
        categoryColumn: string;
        valueColumn: string;
    };
    dataSource: {
        type: DatasourceType;
        deviceSource: DropdownItem;
        device: DropdownItem;
        sensor: DropdownItem;
        attribute: string;
    }
}

interface AddDashboardItemProps {
    authState: AuthState;
    onSave: (e: React.FormEvent<HTMLFormElement>, dashboardItem: DashboardItemModel) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    loading: boolean;
    dashboardId: string;
    dashboardItem?: DashboardItemModel;
}
export type DatasourceType = "device" | "aggregateField";

const AddDashboardItem: React.FC<AddDashboardItemProps> = (props: AddDashboardItemProps): React.ReactElement<void> => {

    const [dashboardItemErrors, setDashboardItemErrors] = React.useState<AddDashboardItemControls>({} as AddDashboardItemControls);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [fetching, setFetching] = React.useState<boolean>(false);

    // Data Source State
    const [itemControls, setItemControls] = React.useState<AddDashboardItemControls>({
        name: '',
        type: null,
        dataSource: { type: "device" },
        gaugeProperties: { min: 0, max: 0 },
        tankProperties: { capacity: 0 },
        chartProperties: { valueColumn: "", categoryColumn: "" },
    } as AddDashboardItemControls);

    // steps tracker
    const [stepTracker, setStepTracker] = React.useState<number>(0);
    const stepList: Array<string> = React.useMemo(() => ["Dashboard Item", "Data Source", "Summary"], []);

    const handleDashboardItemNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItemControls({ ...itemControls, [e.target.name]: e.target.value });
    }, [itemControls]);

    const handleItemTypeDropdownChange = React.useCallback((value: DropdownItem) => {
        setItemControls({ ...itemControls, type: value });
    }, [setItemControls, itemControls]);

    const deviceDataSourcesDropdownChange = React.useCallback((value: DropdownItem) => {
        setItemControls({ ...itemControls, dataSource: { ...itemControls.dataSource, deviceSource: value } });
    }, [itemControls]);

    const deviceDropdownChange = React.useCallback((value: DropdownItem) => {
        setItemControls({ ...itemControls, dataSource: { ...itemControls.dataSource, device: value } });
    }, [itemControls]);

    const deviceSensorDropdownChange = React.useCallback((value: DropdownItem) => {
        setItemControls({ ...itemControls, dataSource: { ...itemControls.dataSource, sensor: value } });
    }, [itemControls]);

    const selectedDataSourceChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setItemControls({ ...itemControls, dataSource: { ...itemControls.dataSource, type: e.target.value as DatasourceType } });
    }, [itemControls]);

    const handleItemPropertyChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: "tank" | "gauge" | "chart") => {
        switch (type) {
            case "gauge":
                setItemControls({ ...itemControls, gaugeProperties: { ...itemControls?.gaugeProperties, [e.target.name]: e.target.value } });
                break;
            case "tank":
                setItemControls({ ...itemControls, tankProperties: { ...itemControls?.tankProperties, [e.target.name]: e.target.value } });
                break;
            case "chart":
                setItemControls({ ...itemControls, chartProperties: { ...itemControls?.chartProperties, [e.target.name]: e.target.value } });
                break;
        }
    }, [itemControls]);


    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        let property: { [k: string]: string | number } = {};

        switch (itemControls?.type?.value) {
            case ChartType.Tank:
                property["item"] = "tank";
                property["capacity"] = itemControls?.tankProperties?.capacity;
                break;
            case ChartType.Gauge:
                property["item"] = "gauge";
                property["min"] = itemControls?.gaugeProperties?.min;
                property["max"] = itemControls?.gaugeProperties?.max;
                break;
            case ChartType.LineGraph:
                property["item"] = "lineGraph";
                property["categoryColumn"] = itemControls?.chartProperties?.categoryColumn;
                property["valueColumn"] = itemControls?.chartProperties?.valueColumn;
                break;
            case ChartType.BarGraph:
                property["item"] = "barGraph";
                property["categoryColumn"] = itemControls?.chartProperties?.categoryColumn;
                property["valueColumn"] = itemControls?.chartProperties?.valueColumn;
                break;
            case ChartType.PieChart:
                property["item"] = "pieChart";
                property["categoryColumn"] = itemControls?.chartProperties?.categoryColumn;
                property["valueColumn"] = itemControls?.chartProperties?.valueColumn;
                break;
            case ChartType.Doughnut:
                property["item"] = "doughnut";
                property["categoryColumn"] = itemControls?.chartProperties?.categoryColumn;
                property["valueColumn"] = itemControls?.chartProperties?.valueColumn;
                break;
            default:
                property["item"] = "status";
                break;
        }

        if (itemControls?.dataSource.type === "device") {
            property["type"] = "device";
            if (itemControls?.dataSource?.deviceSource?.value === "sensor") {
                property["from"] = "sensor";
                property["sourceId"] = itemControls?.dataSource?.sensor?.value;
            } else {
                // set attribute
                property["from"] = "attribute";
                property["sourceId"] = null;
            }
        } else {
            property["type"] = "aggregateField";
            property["from"] = "aggregateField";
            property["sourceId"] = "aggregateFieldSourceId";
        }

        const payload: DashboardItemModel = {
            ...props.dashboardItem,
            type: itemControls?.type?.value,
            name: itemControls?.name,
            property: JSON.stringify([property] || ""),
            dashboardId: props.dashboardId
        };
        setLoading(true);
        DashboardApis.addDashboardItem(payload)
            .then((response: AxiosResponse) => {
                props.onSave(e, response.data);
            });

        e.preventDefault();

    }, [props.dashboardItem, itemControls]);

    React.useEffect(() => {
        setFetching(props?.loading);
    }, [props.loading]);


    return (
        <div className="add-and-edit-dashboard-item">
            <StepTracker step={stepTracker} list={stepList} onClick={(index: number) => setStepTracker(index)} />
            <form className="add-dashboard-item" onSubmit={handleSave}>
                {stepTracker === 0 &&
                    <ItemPropertySection
                        loading={loading}
                        fetching={fetching}
                        itemControls={itemControls}
                        dashboardItemErrors={dashboardItemErrors}
                        handleDashboardItemNameChange={handleDashboardItemNameChange}
                        handleItemTypeDropdownChange={handleItemTypeDropdownChange}
                        handleItemPropertyChange={handleItemPropertyChange}
                    />
                }
                {
                    stepTracker === 1 &&
                    <DataSourcesSection
                        loading={loading}
                        fetching={fetching}
                        deviceDataSourcesDropdownChange={deviceDataSourcesDropdownChange}
                        deviceDropdownChange={deviceDropdownChange}
                        dataSourceTypeChange={selectedDataSourceChange}
                        authState={props.authState}
                        itemControls={itemControls}
                        deviceSensorChange={deviceSensorDropdownChange}
                    />
                }
                {
                    stepTracker === 2 &&
                    <DashabordItemSummarySection
                        fetching={fetching}
                        itemControls={itemControls}
                        authState={props.authState}
                    />
                }
                <div className="row controls-holder">
                    <div className="col-12 col-sm-6">
                        <Button label="Cancel" size="sm" theme="outline-primary" onClick={props.onCancel} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="d-flex justify-content-end next-and-previous">
                            {stepTracker > 0 && <Button label="" size="sm" theme="outline-primary" title="Previous" onClick={() => setStepTracker(stepTracker - 1)}>
                                <Icon src={<SvgElement type={icontypesEnum.PREVIOUS} />} />
                            </Button>}
                            {stepTracker < 2 &&
                                <Button label="" size="sm" className="ml-6" theme="primary" title="Next" onClick={() => setStepTracker(stepTracker + 1)}>
                                    <Icon src={<SvgElement type={icontypesEnum.NEXT} />} />
                                </Button>
                            }
                            {stepTracker === 2 &&
                                <Button label="Save" className="ml-6" type="submit" size="sm" theme="primary" title="Save" onClick={null}>
                                    <Loader toggle={loading} />
                                </Button>
                            }
                        </div>
                    </div>
                </div>

            </form>
        </div>

    );
};

export default AddDashboardItem;
