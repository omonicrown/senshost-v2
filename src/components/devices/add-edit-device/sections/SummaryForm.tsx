import React from "react";
import { DeviceModel } from "../../../../interfaces/models";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel"
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
interface SummaryFormProps {
    device: DeviceModel;
}

const SummaryForm: React.FunctionComponent<SummaryFormProps> = (props: SummaryFormProps) => {
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

    const selectedDeviceType: DropdownItem = React.useMemo(() => {
        return deviceTypes?.find((item: DropdownItem) => item.value === props?.device?.type);
    }, [props?.device?.type, deviceTypes]);

    return (
        <React.Fragment>
            <div className="row title-holder">
                <div className="col">
                    Device
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextLabel label="Device name" value={props?.device?.name} />
                </div>
                <div className="col-sm-6 col-12">
                    <TextLabel label="Device type" value={selectedDeviceType?.label} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default SummaryForm;