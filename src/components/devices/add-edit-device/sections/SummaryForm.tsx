import React from "react";
import { DeviceModel } from "../../../../interfaces/models";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel"
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Table } from "@sebgroup/react-components/dist/Table";
import { TableHeader } from "@sebgroup/react-components/dist/Table/Table";
import { DEVICETYPES, SENSORSTYPESCOLUMN, ACTUATORS, ACTUATORCOLUMNS } from "../../../../constants";

interface SummaryFormProps {
    device: DeviceModel;
}

const SummaryForm: React.FunctionComponent<SummaryFormProps> = (props: SummaryFormProps) => {
    const deviceTypes = React.useMemo(() => DEVICETYPES, []);
    const actuatorTypes = React.useMemo(() => ACTUATORS, []);
    const sensorColumns: Array<TableHeader> = React.useMemo(() => SENSORSTYPESCOLUMN, []);
    const actuatorColumns: Array<TableHeader> = React.useMemo(() => ACTUATORCOLUMNS, []);

    const selectedDeviceType: DropdownItem = React.useMemo(() => {
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
                        Actuators
                    </div>
                </div>
            </div>

            <div className="row section-actuator my-2">
                <div className="col">
                    <Table columns={actuatorColumns} data={props?.device?.actuators} />
                </div>

            </div>

        </React.Fragment>
    );
};

export default SummaryForm;