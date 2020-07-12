import React from "react";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { DeviceModel } from "../../../../interfaces/models";

interface DeviceFormProps {
    selectedType: DropdownItem;
    handleDeviceTypeChange: (value: DropdownItem) => void;
    device: DeviceModel;
    handleDeviceNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeviceForm: React.FunctionComponent<DeviceFormProps> = (props: DeviceFormProps) => {
    const deviceTypes = React.useMemo(() => [{
        label: "Temperature Sensor",
        value: 0
    },
    {
        label: "Humidity Sensor",
        value: 1
    }, {
        label: "Pressure Sensor",
        value: 2
    }, {
        label: "Liquid Level",
        value: 3
    }, {
        label: "Smoke Sensor",
        value: 4
    }, {
        label: "Water Sensor",
        value: 5
    }, {
        label: "Gas Sensor",
        value: 6
    }, {
        label: "Chemical Sensor",
        value: 7
    }, {
        label: "Motion Detection Sensor",
        value: 8
    }, {
        label: "Accelerometer Sensor",
        value: 9
    }, {
        label: "Proximity Sensor",
        value: 10
    }, {
        label: "Gyroscope Sensor",
        value: 11
    }, {
        label: "Beacon Light",
        value: 12
    }, {
        label: "Image Sensor",
        value: 13
    }, {
        label: "Level Sensor",
        value: 14
    }, {
        label: "I R Sensor",
        value: 15
    }], []);
    return (
        <div className="row">
            <div className="col-sm-6 col-12">
                <Dropdown
                    label="Device type"
                    list={deviceTypes}
                    selectedValue={props.selectedType}
                    onChange={props.handleDeviceTypeChange}
                />
            </div>
            <div className="col-sm-6 col-12">
                <TextBoxGroup
                    name="name"
                    label="Device name"
                    placeholder="Name"
                    value={props.device?.name}
                    onChange={props.handleDeviceNameChange}
                />
            </div>
        </div>
    )

}

export default DeviceForm;