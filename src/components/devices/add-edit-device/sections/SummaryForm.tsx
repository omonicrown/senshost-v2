import React from "react";
import { DeviceModel, ActuatorModel } from "../../../../interfaces/models";
import { TextLabel } from "@sebgroup/react-components/dist/TextLabel"
import { Accordion, AccrodionListItem } from "@sebgroup/react-components/dist/Accordion/Accordion"

import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Table } from "@sebgroup/react-components/dist/Table";
import { TableHeader } from "@sebgroup/react-components/dist/Table/Table";
import { DEVICETYPES, SENSORSTYPESCOLUMN, ACTUATORCOLUMNS } from "../../../../constants";

import { ActuatorTableData } from "./ActuatorForm";

interface SummaryFormProps {
    device: DeviceModel;
    viewType: "detail" | "accordion";
}

const SummaryForm: React.FunctionComponent<SummaryFormProps> = (props: SummaryFormProps) => {
    const deviceTypes = React.useMemo(() => DEVICETYPES, []);
    const sensorColumns: Array<TableHeader> = React.useMemo(() => SENSORSTYPESCOLUMN, []);
    const actuatorColumns: Array<TableHeader> = React.useMemo(() => ACTUATORCOLUMNS, []);


    const actuatorRows = React.useMemo((): Array<ActuatorTableData> => {
        return props?.device?.actuators?.map((actuator: ActuatorModel): ActuatorTableData => {
            return {
                name: actuator.name,
                value: actuator?.propertise?.value,
                message: actuator?.propertise?.message,
                type: actuator?.type,
                ON: actuator?.propertise?.ON,
                OFF: actuator?.propertise?.OFF
            }
        })
    }, [props.device?.actuators]);

    const selectedDeviceType: DropdownItem = React.useMemo(() => {
        return deviceTypes?.find((item: DropdownItem) => item.value === props?.device?.type);
    }, [props?.device?.type, deviceTypes]);

    return (
        props.viewType === "accordion" ?

            <Accordion list={[
                {
                    header: "Device",
                    content: <div className="card">
                        <div className={"card-body" + (!props.device?.actuators ? " skeleton-loader" : "")}>
                            <div className="row section-device-holder">
                                <div className="col">
                                    <TextLabel label="Device name" value={props?.device?.name} />
                                </div>
                                <div className="col">
                                    <TextLabel label="Device type" value={selectedDeviceType?.label} />
                                </div>
                            </div>
                        </div>
                    </div>
                }, {
                    header: "Sensors",
                    content: <div className="card">
                        <div className="card-body">
                            <Table columns={sensorColumns} data={props?.device?.fields} />
                        </div>
                    </div>
                }, {
                    header: "Actuators",
                    content: <div className="card">
                        <div className="card-body">
                            <Table columns={actuatorColumns} data={actuatorRows} />
                        </div>
                    </div>
                }
            ]} alternative />
            :

            <React.Fragment>
                {/** Devices */}

                <div className="row">
                    <div className="col">
                        <div className="title-holder">
                            <h4>Device</h4>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className={"card-body" + (!props.device?.actuators ? " skeleton-loader" : "")}>
                        <div className="row section-device-holder">
                            <div className="col">
                                <TextLabel label="Device name" value={props?.device?.name} />
                            </div>
                            <div className="col">
                                <TextLabel label="Device type" value={selectedDeviceType?.label} />
                            </div>
                        </div>
                    </div>
                </div>
                {/** Sensors */}
                <div className="row">
                    <div className="col">
                        <div className="title-holder">
                            <h4>Sensors</h4>
                        </div>
                    </div>
                </div>

                <div className="row section-sensor">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <Table columns={sensorColumns} data={props?.device?.fields} />
                            </div>
                        </div>
                    </div>

                </div>

                {/** Actuators */}
                <div className="row">
                    <div className="col">
                        <div className="title-holder">
                            <h4>Actuators</h4>
                        </div>
                    </div>
                </div>

                <div className="row section-actuator my-2">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <Table columns={actuatorColumns} data={actuatorRows} />
                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>

    );
};

export default SummaryForm;