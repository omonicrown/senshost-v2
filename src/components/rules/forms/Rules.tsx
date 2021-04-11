import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { AxiosResponse } from "axios";
import React from "react";
import { Edge, Elements, FlowElement } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { SensorApis } from "../../../apis/sensorApis";
import { DeviceModel, SensorModel } from "../../../interfaces/models";
import { DeviceState, States } from "../../../interfaces/states";
import { DatasourceType } from "../../dashboardItem/modals/AddDashboardItem";

import { DEVICEDATASOURCETYPE, DEVICEDATASOURCES } from "../../dashboardItem/modals/sections/DataSources";

interface RulesFormProps {
    loading: boolean;
    handleRulesDropDownChange: (value: DropdownItem, field: "device" | "deviceSource" | "sensor") => void;
    selectedElement: FlowElement & Edge;
    elements: Elements;
    handleDataSourceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DataSourceProps {
    type?: DatasourceType;
    deviceSource?: DropdownItem;
    device?: DropdownItem;
    sensor?: DropdownItem;
    attribute?: string;
}
const RulesForm: React.FC<RulesFormProps> = (props: RulesFormProps): React.ReactElement<void> => {
    const [dataSource, setDataSource] = React.useState<DataSourceProps>({ type: "device", });

    const [sensors, setSensors] = React.useState<Array<DropdownItem>>([{ label: 'Please select', value: null }]);

    const deviceState: DeviceState = useSelector((states: States) => states?.devices);
    const devices: Array<DropdownItem> = React.useMemo(() => {
        const updatedDevices: Array<DropdownItem> = deviceState?.devices?.map((device: DeviceModel) => ({ label: device.name, value: device.id }));
        return [{ label: 'Please select', value: null }, ...updatedDevices];
    }, [deviceState?.devices]);

    React.useEffect(() => {
        if (dataSource?.device?.value) {
            SensorApis.getSensorsByDeviceId(dataSource?.device?.value)
                .then((response: AxiosResponse<Array<SensorModel>>) => {
                    if (response.data) {
                        const updatedSensors: Array<DropdownItem> = response.data.map((sensor: SensorModel) => ({ label: sensor?.name, value: sensor?.id }));
                        setSensors([...sensors, ...updatedSensors]);
                    }
                })
        } else {
            setSensors([{ label: 'Please select', value: null }]);
        }
    }, [dataSource?.device]);


    React.useEffect(() => {
        const element: FlowElement = props.elements?.find((el: FlowElement) => el.id === props.selectedElement?.id);
        setDataSource({
            ...dataSource,
            sensor: element?.data?.nodeControls?.rules?.sensor,
            deviceSource: element?.data?.nodeControls?.rules?.deviceSource,
            device: element?.data?.nodeControls?.rules?.device,
            type: element?.data?.nodeControls?.rules?.type,
        })
    }, [props.selectedElement, props.elements, setDataSource]);

    return (
        <div className="rule-properties-holder">
            <fieldset className="properties-holder border my-2 p-2">
                <legend className="w-auto"><h6 className="custom-label"> Datasource Type </h6></legend>
                <div className="row">
                    <RadioGroup
                        list={DEVICEDATASOURCETYPE}
                        name="dataSourceType"
                        label=""
                        className="col"
                        value={dataSource.type}
                        onChange={props.handleDataSourceChange}
                        disableAll={props.loading}
                        condensed
                    />
                </div>
            </fieldset>

            { dataSource?.type === 'aggregateField' ?
                <fieldset className="aggregatefield-datasource-properties border my-2 p-2">
                    <legend className="w-auto"><h6 className="custom-label"> Aggregate field </h6></legend>

                </fieldset>
                :
                <fieldset className="device-datasource-properties border my-2 p-2">
                    <legend className="w-auto"><h6 className="custom-label"> Datasource Value </h6></legend>
                    <div className="row pt-2">
                        <Dropdown
                            label="Device"
                            name="device"
                            list={devices}
                            className="col"
                            disabled={props?.loading}
                            selectedValue={dataSource?.device}
                            error={null}
                            onChange={(value: DropdownItem) => props.handleRulesDropDownChange(value, "device")}
                        />
                    </div>
                    <div className="row">
                        <Dropdown
                            label="Device source"
                            name="deviceSource"
                            className="col"
                            list={DEVICEDATASOURCES}
                            disabled={props?.loading}
                            selectedValue={dataSource?.deviceSource}
                            error={null}
                            onChange={(value: DropdownItem) => props.handleRulesDropDownChange(value, "deviceSource")}
                        />
                    </div>
                    {dataSource?.deviceSource?.value === 'sensor' &&
                        <div className="row">
                            <Dropdown
                                label="Sensors"
                                name="sensor"
                                list={sensors}
                                className="col"
                                disabled={props?.loading}
                                selectedValue={dataSource?.sensor}
                                error={null}
                                onChange={(value: DropdownItem) => props.handleRulesDropDownChange(value, "sensor")}
                            />
                        </div>
                    }
                </fieldset>
            }

        </div>
    )
};

export default RulesForm;