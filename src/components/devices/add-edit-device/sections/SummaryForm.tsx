import React from "react";
import { DeviceModel } from "../../../../interfaces/models";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel"
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Table } from "@sebgroup/react-components/dist/Table";
import { TableHeader } from "@sebgroup/react-components/dist/Table/Table";
import { DEVICETYPES, SENSORSTYPESCOLUMN, ACTUATORS } from "../../../../constants";

interface SummaryFormProps {
    device: DeviceModel;
}

const SummaryForm: React.FunctionComponent<SummaryFormProps> = (props: SummaryFormProps) => {
    const deviceTypes = React.useMemo(() => DEVICETYPES, []);
    const actuatorTypes = React.useMemo(() => ACTUATORS, []);
    const sensorColumns: Array<TableHeader> = React.useMemo(() => SENSORSTYPESCOLUMN, []);

    const selectedDeviceType: DropdownItem = React.useMemo(() => {
        return deviceTypes?.find((item: DropdownItem) => item.value === props?.device?.type);
    }, [props?.device?.type, deviceTypes]);

    const selectedActuatorType: DropdownItem = React.useMemo(() => {
        return actuatorTypes?.find((item: DropdownItem) => item.value === props?.device?.widget?.type);
    }, [props?.device?.type, actuatorTypes]);

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
                    <TextLabel label="Actuator type" value={selectedActuatorType?.label} />
                </div>
            </div>

            {(props?.device?.widget?.propertise.ON || props?.device?.widget?.propertise.OFF) &&
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <TextLabel label="On value" value={props?.device?.widget?.propertise.ON} />
                    </div>
                    <div className="col-sm-6 col-12">
                        <TextLabel label="Off value" value={props?.device?.widget?.propertise.OFF} />
                    </div>
                </div>
            }
            {(props?.device?.widget?.propertise.message || props?.device?.widget?.propertise.value) &&
                <React.Fragment>
                    <div className="row">
                        {props?.device?.widget?.propertise.message &&
                            <div className="col-sm-6 col-12">
                                <TextLabel label="Message" value={props?.device?.widget?.propertise.message} />
                            </div>
                        }
                        {props?.device?.widget?.propertise.value &&
                            <div className="col-sm-6 col-12">
                                <TextLabel label="Analog Value" value={props?.device?.widget?.propertise.value} />
                            </div>
                        }
                    </div>
                </React.Fragment>
            }

        </React.Fragment>
    );
};

export default SummaryForm;