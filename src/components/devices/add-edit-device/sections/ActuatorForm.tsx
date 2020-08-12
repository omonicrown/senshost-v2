import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { DeviceModel, SensorModel } from "../../../../interfaces/models";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { ACTUATORS } from "../../../../constants";

interface ActuatorFormProps {
    device: DeviceModel;
    selectedActuatorType: DropdownItem;
    handleActuatorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleActuatorTypeChange: (value: DropdownItem) => void;
    handleActuatorPropertyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ActuatorForm: React.FunctionComponent<ActuatorFormProps> = (props: ActuatorFormProps) => {
    const actuatorTypes = React.useMemo(() => ACTUATORS, []);

    return (
        <div className="row">
            <div className="col-sm-6 col-12">
                <div className="row">
                    <div className="col">
                        <TextBoxGroup
                            name="name"
                            label="Actuator name"
                            placeholder="Name"
                            value={props.device?.widget?.name}
                            onChange={props.handleActuatorNameChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Dropdown
                            label="Actuator type"
                            list={actuatorTypes}
                            selectedValue={props.selectedActuatorType}
                            onChange={props.handleActuatorTypeChange}
                        />
                    </div>
                </div>

                {props?.device?.widget?.type === 0 &&
                    <React.Fragment>
                        <div className="row">
                            <div className="col">
                                <TextBoxGroup
                                    name="ON"
                                    label="On Value"
                                    placeholder="ON value"
                                    value={props.device?.widget?.propertise?.ON}
                                    onChange={props.handleActuatorPropertyChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <TextBoxGroup
                                    name="OFF"
                                    label="Off Value"
                                    placeholder="Off value"
                                    value={props.device?.widget?.propertise?.OFF}
                                    onChange={props.handleActuatorPropertyChange}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                }
                {props?.device?.widget?.type === 1 &&
                    <div className="row">
                        <div className="col">
                            <TextBoxGroup
                                name="value"
                                label="value"
                                placeholder="value"
                                value={props.device?.widget?.propertise?.value}
                                onChange={props.handleActuatorPropertyChange}
                            />
                        </div>
                    </div>
                }

                {props?.device?.widget?.type === 2 &&
                    <div className="row">
                        <div className="col">
                            <TextBoxGroup
                                name="message"
                                label="message"
                                placeholder="message"
                                value={props.device?.widget?.propertise?.message}
                                onChange={props.handleActuatorPropertyChange}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="col-sm-6 col-12">

            </div>
        </div>
    );

};

export default ActuatorForm;