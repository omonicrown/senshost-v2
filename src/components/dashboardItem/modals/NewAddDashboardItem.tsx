import { Button } from "@sebgroup/react-components/dist/Button";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { StepTracker } from "@sebgroup/react-components/dist/StepTracker";

import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";

import React from "react";
import { DASHBOARDITEMTYPES } from "../../../constants";
import { DashboardItemModel } from "../../../interfaces/models";
import { AuthState } from "../../../interfaces/states";
import { icontypesEnum, SvgElement } from "../../../utils/svgElement";

import DataSourcesSection from "./sections/DataSources";
import DashabordItemSummarySection from "./sections/DashboardItemSummary";
import { DashboardApis } from "../../../apis/dashboardApis";
import { AxiosResponse } from "axios";

const dashboardItemTypes = [{ label: 'Please select', value: null }, ...DASHBOARDITEMTYPES];

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
    const [dashboardItem, setDashboardItem] = React.useState<DashboardItemModel>({ name: '', type: null, dashboardId: null, possition: '', property: null });
    const [selectedItemType, setSelectedItemType] = React.useState<DropdownItem<number>>(dashboardItemTypes[0]);

    const [dashboardItemErrors, setDashboardItemErrors] = React.useState<DashboardItemModel>(null);

    // Data Source State
    const [selectedDataSourceType, setSelectedDataSourceType] = React.useState<DatasourceType>("device");
    const [selectedDeviceSource, setSelectedDeviceSource] = React.useState<DropdownItem>({} as DropdownItem);
    const [selectedDevice, setSelectedDevice] = React.useState<DropdownItem>({} as DropdownItem);
    const [selectedDeviceSensor, setSelectedDeviceSensor] = React.useState<DropdownItem>({} as DropdownItem);


    // steps tracker
    const [stepTracker, setStepTracker] = React.useState<number>(0);
    const stepList: Array<string> = React.useMemo(() => ["Dashboard Item", "Data Source", "Summary"], []);


    const handleDashboardItemNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDashboardItem({ ...dashboardItem, [e.target.name]: e.target.value });
    }, [setDashboardItem, dashboardItem]);

    const handleItemTypeDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedItemType(value);
        setDashboardItem({ ...dashboardItem, type: Number(value?.value) });

    }, [setDashboardItem, dashboardItem, setSelectedItemType]);

    const deviceDataSourcesDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedDeviceSource(value);
    }, []);

    const deviceDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedDevice(value);
    }, []);

    const deviceSensorDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedDeviceSensor(value);
    }, []);

    const selectedDataSourceChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDataSourceType(e.target.value as DatasourceType);
    }, []);

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        let property: { [k: string]: string | number }  = {};

        if (selectedDataSourceType === "device") {
            property["device"] = selectedDevice?.value;
            console.log("The selected source is ", selectedDeviceSource);
            if (selectedDeviceSource.value === "sensor") {
                property["sensor"] = selectedDeviceSensor?.value;
            } else {
                // set att
                property["attribute"] = null;
            }
        } else {
            property["aggregateField"] = null;
            property["aggregateFieldId"] = null;
        }

        const payload: DashboardItemModel = {
            ...dashboardItem,
            property: JSON.stringify(property || ""),
            dashboardId: props.dashboardId
        };

        DashboardApis.addDashboardItem(payload)
            .then((response: AxiosResponse) => {
                console.log("The response is here ", response);

                // props.onSave(e, response.data);
            });

    }, [dashboardItem, selectedDeviceSource, selectedDeviceSensor, selectedDataSourceType]);


    return (
        <div className="add-and-edit-dashboard-item">
            <StepTracker step={stepTracker} list={stepList} onClick={(index: number) => setStepTracker(index)} />
            <form className="add-dashboard-item" onSubmit={handleSave}>
                {stepTracker === 0 &&
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <TextBoxGroup
                                name="name"
                                label="Name"
                                type="text"
                                disabled={props?.loading}
                                placeholder="Dashboard name"
                                value={dashboardItem?.name}
                                error={dashboardItemErrors?.name}
                                onChange={handleDashboardItemNameChange}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Dropdown
                                label="Item Type"
                                list={dashboardItemTypes}
                                disabled={props?.loading}
                                selectedValue={selectedItemType}
                                error={dashboardItemErrors?.type as any}
                                onChange={handleItemTypeDropdownChange}
                            />
                        </div>
                    </div>
                }
                {
                    stepTracker === 1 &&
                    <DataSourcesSection
                        loading={props.loading}
                        selectedDeviceSource={selectedDeviceSource}
                        selectedDevice={selectedDevice}
                        deviceDataSourcesDropdownChange={deviceDataSourcesDropdownChange}
                        deviceDropdownChange={deviceDropdownChange}
                        dataSourceTypeChange={selectedDataSourceChange}
                        selectedDataSourceType={selectedDataSourceType}
                        authState={props.authState}
                        selectedDeviceSensor={selectedDeviceSensor}
                        deviceSensorChange={deviceSensorDropdownChange}
                    />
                }
                {
                    stepTracker === 2 &&
                    <DashabordItemSummarySection
                        loading={props.loading}
                        selectedDeviceSource={selectedDeviceSource}
                        selectedDevice={selectedDevice}
                        dashboardItem={dashboardItem}
                        selectedDataSourceType={selectedDataSourceType}
                        authState={props.authState}
                        selectedDeviceSensor={selectedDeviceSensor}
                        selectedDashboardItemType={selectedItemType}
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
                                    <Loader toggle={props.loading} />
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
