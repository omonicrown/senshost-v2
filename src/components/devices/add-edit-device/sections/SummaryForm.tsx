import React from "react";
import { DeviceModel } from "../../../../interfaces/models";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel"
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Table } from "@sebgroup/react-components/dist/Table";
import { TableHeader } from "@sebgroup/react-components/dist/Table/Table";
import { DEVICETYPES, SENSORSTYPESCOLUMN, SENSORSTYPES } from "../../../../constants";

interface SummaryFormProps {
    device: DeviceModel;
}

const SummaryForm: React.FunctionComponent<SummaryFormProps> = (props: SummaryFormProps) => {
    const deviceTypes = React.useMemo(() => DEVICETYPES, []);
    const sensorTypes = React.useMemo(() => SENSORSTYPES, []);
    const sensorColumns: Array<TableHeader> = React.useMemo(() => SENSORSTYPESCOLUMN, []);

    const selectedDeviceType: DropdownItem = React.useMemo(() => {
        return deviceTypes?.find((item: DropdownItem) => item.value === props?.device?.type);
    }, [props?.device?.type, deviceTypes]);

    const selectedSensor: DropdownItem = React.useMemo(() => {
        return sensorTypes?.find((item: DropdownItem) => item.value === props?.device?.widget?.type);
    }, [props?.device?.type, sensorTypes]);

    const selectedActuatorType: DropdownItem = React.useMemo(() => {
        return deviceTypes?.find((item: DropdownItem) => item.value === props?.device?.type);
    }, [props?.device?.type, deviceTypes]);

    return (
        <React.Fragment>
            {/** Devices */}
            <div className="row">
                <div className="col">
                    <div className="title-holder">
                        Device
                    </div>
                </div>
            </div>
            <div className="row section-device-holder">
                <div className="col-sm-6 col-12">
                    <TextLabel label="Device name" value={props?.device?.name} />
                </div>
                <div className="col-sm-6 col-12">
                    <TextLabel label="Device type" value={selectedDeviceType?.label} />
                </div>
            </div>

            {/** Sensors */}
            <div className="row">
                <div className="col">
                    <div className="title-holder">
                        Sensors
                    </div>
                </div>
            </div>

            <div className="row section-sensor">
                <div className="col">
                    <Table columns={sensorColumns} data={props?.device?.fields} />
                </div>

            </div>

            {/** Actuators */}
            <div className="row">
                <div className="col">
                    <div className="title-holder">
                        Actuator
                    </div>
                </div>
            </div>

            <div className="row  my-2">
                <div className="col-sm-6 col-12">
                    <TextLabel label="Actuator name" value={props?.device?.widget?.name} />
                </div>
                <div className="col-sm-6 col-12">
                    <TextLabel label="Actuator type" value={selectedDeviceType?.label} />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 col-12">
                    <TextLabel label="On value" value={props?.device?.widget?.propertise.ON} />
                </div>
                <div className="col-sm-6 col-12">
                    <TextLabel label="Off value" value={props?.device?.widget?.propertise.OFF} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default SummaryForm;