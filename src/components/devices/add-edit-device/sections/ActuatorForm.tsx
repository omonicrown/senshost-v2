import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { DeviceModel, SensorModel } from "../../../../interfaces/models";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";

interface ActuatorFormProps {
    device: DeviceModel;
    selectedActuatorType: DropdownItem;
    handleActuatorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleActuatorTypeChange: (value: DropdownItem) => void;
    handleActuatorPropertyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ActuatorForm: React.FunctionComponent<ActuatorFormProps> = (props: ActuatorFormProps) => {
    const actuatorTypes = React.useMemo(() => [{
        label: "Default",
        value: 0,
    }, {
        label: "Tank",
        value: 1
    }, {
        label: "Status",
        value: 2
    }, {
        label: "Graph",
        value: 3
    }, {
        label: "Strobe",
        value: 4
    }, {
        label: "Trash",
        value: 5
    }, {
        label: "Gauge",
        value: 6
    }], []);

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
            </div>
            <div className="col-sm-6 col-12">

            </div>
        </div>
    );

};

export default ActuatorForm;