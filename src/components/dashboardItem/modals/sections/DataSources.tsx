import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { DeviceApis } from "../../../../apis/deviceApis";
import { SensorApis } from "../../../../apis/sensorApis";
import { DeviceModel, SensorModel } from "../../../../interfaces/models";
import { AuthState } from "../../../../interfaces/states";

const DEVICEDATASOURCES: Array<DropdownItem> = [
    { label: 'Please select', value: null },
    {
        label: "Sensors",
        value: "sensors"
    },
    {
        label: "Attributes",
        value: "attributes"
    }
];

const DEVICEDATASOURCETYPE = [
    { value: "device", label: "Device" },
    { value: "aggregateField", label: "Aggregate Field" }
];

interface DataSourcesProps {
    loading: boolean;
    selectedDeviceSource?: DropdownItem;
    selectedDevice: DropdownItem;
    selectedDeviceSensor: DropdownItem;
    deviceDataSourcesDropdownChange: (e: DropdownItem) => void;
    deviceSensorChange: (e: DropdownItem) => void;
    deviceDropdownChange: (e: DropdownItem) => void;
    dataSourceTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedDataSourceType: string;
    authState: AuthState;
}

const DataSources: React.FC<DataSourcesProps> = (props: DataSourcesProps): React.ReactElement<void> => {

    const [devices, setDevices] = React.useState<Array<DropdownItem>>([{ label: 'Please select', value: null }]);
    const [sensors, setSensors] = React.useState<Array<DropdownItem>>([{ label: 'Please select', value: null }]);

    React.useEffect(() => {
        DeviceApis.getDevicesByAccount(props.authState?.auth?.account?.id)
            .then((response: AxiosResponse<Array<DeviceModel>>) => {
                if (response?.data) {
                    const updatedDevices: Array<DropdownItem> = response?.data?.map((device: DeviceModel) => ({ label: device.name, value: device.id }));
                    setDevices([...devices, ...updatedDevices]);
                }
            }).catch((error: AxiosError) => {
                setDevices([{ label: 'Please select', value: null }]);
            });
    }, []);

    React.useEffect(() => {
        if (props.selectedDevice?.value) {
            SensorApis.getSensorsByDeviceId(props.selectedDevice.value)
                .then((response: AxiosResponse<Array<SensorModel>>) => {
                    if (response.data) {
                        const updatedSensors: Array<DropdownItem> = response.data.map((sensor: SensorModel) => ({ label: sensor?.name, value: sensor?.id }));
                        setSensors([...sensors, ...updatedSensors]);
                    }
                })
        } else {
            setSensors([{ label: 'Please select', value: null }]);
        }
    }, [props.selectedDevice]);

    return (
        <React.Fragment>
            <fieldset className="properties-holder border my-2 p-2">
                <legend className="w-auto"><h5 className="custom-label"> Datasource Type </h5></legend>
                <div className="row">
                    <div className="col">
                        <RadioGroup list={DEVICEDATASOURCETYPE}
                            name="dataSourceType"
                            label=""
                            value={props.selectedDataSourceType}
                            onChange={props.dataSourceTypeChange}
                            condensed
                            inline
                        />
                    </div>
                </div>
            </fieldset>
            { props.selectedDataSourceType === 'aggregateField' ?
                <fieldset className="aggregatefield-datasource-properties border my-2 p-2">
                    <legend className="w-auto"><h5 className="custom-label"> Aggregate field </h5></legend>

                </fieldset>
                :
                <fieldset className="device-datasource-properties border my-2 p-2">
                    <legend className="w-auto"><h5 className="custom-label"> Datasource Value </h5></legend>
                    <div className="row pt-2">
                        <div className="col-12 col-sm-6">
                            <Dropdown
                                label="Device"
                                list={devices}
                                disabled={props?.loading}
                                selectedValue={props.selectedDevice}
                                error={null}
                                onChange={props.deviceDropdownChange}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Dropdown
                                label="Device source"
                                list={DEVICEDATASOURCES}
                                disabled={props?.loading}
                                selectedValue={props.selectedDeviceSource}
                                error={null}
                                onChange={props.deviceDataSourcesDropdownChange}
                            />
                        </div>
                    </div>
                    {props.selectedDeviceSource.value === 'sensors' &&
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <Dropdown
                                    label="Sensors"
                                    list={sensors}
                                    disabled={props?.loading}
                                    selectedValue={props.selectedDeviceSensor}
                                    error={null}
                                    onChange={props.deviceSensorChange}
                                />
                            </div>
                        </div>
                    }
                </fieldset>
            }
        </React.Fragment>
    );

};

export default DataSources;