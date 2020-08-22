import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { DeviceModel, ActuatorModel } from "../../../../interfaces/models";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { ACTUATORS, ACTUATORCOLUMNS } from "../../../../constants";
import { Button } from "@sebgroup/react-components/dist/Button";
import { Table } from "@sebgroup/react-components/dist/Table";
import { TableHeader, PrimaryActionButton, TableRow, DataItem } from "@sebgroup/react-components/dist/Table/Table";

interface ActuatorFormProps {
    device: DeviceModel;
    selectedActuatorType: DropdownItem;
    handleActuatorSubmitChange: (actuators: Array<ActuatorModel>) => void;
}

export interface ActuatorTableData {
    name: string;
    value: string;
    message: string;
    type: number;
    ON: string
    OFF: string;
}

type ActuatorError = {
    [k in keyof ActuatorTableData]: string;
}
const ActuatorForm: React.FunctionComponent<ActuatorFormProps> = (props: ActuatorFormProps) => {
    const actuatorTypes: Array<DropdownItem> = React.useMemo(() => ACTUATORS, []);

    const actuatorColumns: Array<TableHeader> = React.useMemo(() => ACTUATORCOLUMNS, []);
    const [actuatorError, setActuatorError] = React.useState<ActuatorError>()

    const [selectedActuatorType, setSelectedActuatorType] = React.useState<DropdownItem>(null);

    const [actuator, setActuator] = React.useState<ActuatorModel>({
        name: "",
        propertise: { ON: "", OFF: "", message: "", value: "" }
    } as ActuatorModel);


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


    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Delete",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => {
            const indexOfActuatorToBeRemoved: number = actuatorRows?.findIndex((a: ActuatorTableData) => a.name === selectedRow["name"]);

            const updatedActuators: Array<ActuatorModel> = [
                ...props.device?.actuators?.slice(0, indexOfActuatorToBeRemoved),
                ...props.device?.actuators?.slice(indexOfActuatorToBeRemoved + 1)
            ];

            props?.handleActuatorSubmitChange(updatedActuators);
        },
    }), [actuatorRows, props]);


    const handleActuatorTypeChange = React.useCallback((e: DropdownItem) => {
        setSelectedActuatorType(e);
        setActuator({ ...actuator, type: e.value });
    }, [selectedActuatorType, setSelectedActuatorType, setActuator, actuator]);

    const handleActuatorTextChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setActuator({ ...actuator, [e.target.name]: e.target.value });
    }, [actuator, setActuator]);

    const handleActuatorPropertyChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setActuator({
            ...actuator, propertise: {
                ...actuator?.propertise as any,
                [e.target.name]: e.target.value
            }
        });
    }, [actuator, setActuator]);


    const handleAddSubmit = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let error: ActuatorError = null;
        if (!actuator?.name) {
            error = { ...error, name: "Actuator name cannot be empty" };
        }

        if (actuator?.type === null) {
            error = { ...error, name: "Actuator type cannot be empty" };
        } else {
            if (actuator?.type === 0) {
                if (!actuator?.propertise?.ON) {
                    error = { ...error, value: "On Value cannot be empty" };
                }

                if (!actuator?.propertise?.OFF) {
                    error = { ...error, value: "OFF value cannot be empty" };
                }
            } else if (actuator?.type === 1) {
                if (!actuator?.propertise?.value) {
                    error = { ...error, value: "value cannot be empty" };
                }
            } else {
                if (!actuator?.propertise?.message) {
                    error = { ...error, value: "message cannot be empty" };
                }
            }
        }
        console.log("it is here ", actuator)

        if (!error) {
            const updatedActuators: Array<ActuatorModel> = [...props.device?.actuators, actuator];
            setActuator({
                name: "",
                propertise: { ON: "", OFF: "", message: "", value: "" }
            } as ActuatorModel);

            props?.handleActuatorSubmitChange(updatedActuators);
        }
        setActuatorError(error);
        e.preventDefault();
    }, [actuator, props]);

    React.useEffect(() => {
        setActuator({
            ...actuator,
            propertise: {
                ...actuator.propertise,
                message: "",
                value: "",
                ON: "",
                OFF: ""
            }
        }
        )
    }, [selectedActuatorType]);


    return (
        <div className="actuator-holder">
            <div className="row">
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="name"
                        label="Actuator name"
                        placeholder="Name"
                        value={actuator?.name}
                        error={actuatorError?.name}
                        onChange={handleActuatorTextChange}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <Dropdown
                        label="Actuator type"
                        list={actuatorTypes}
                        selectedValue={selectedActuatorType}
                        error={actuatorError?.type}
                        onChange={handleActuatorTypeChange}
                    />
                </div>

                {actuator?.type === 0 &&
                    <React.Fragment>
                        <div className="col-12 col-sm-6">
                            <TextBoxGroup
                                name="ON"
                                label="On Value"
                                placeholder="ON value"
                                error={actuatorError?.ON}
                                value={actuator?.propertise?.ON}
                                onChange={handleActuatorPropertyChange}
                            />
                        </div>

                        <div className="col-12 col-sm-6">
                            <TextBoxGroup
                                name="OFF"
                                label="Off Value"
                                placeholder="Off value"
                                error={actuatorError?.OFF}
                                value={actuator?.propertise?.OFF}
                                onChange={handleActuatorPropertyChange}
                            />
                        </div>
                    </React.Fragment>
                }
                {actuator?.type === 1 &&
                    <div className="col-12 col-sm-6">
                        <TextBoxGroup
                            name="value"
                            label="value"
                            placeholder="value"
                            error={actuatorError?.value}
                            value={actuator?.propertise?.value}
                            onChange={handleActuatorPropertyChange}
                        />
                    </div>
                }

                {actuator?.type === 2 &&
                    <div className="col-12 col-sm-6">
                        <TextBoxGroup
                            name="message"
                            label="message"
                            placeholder="message"
                            value={actuator.propertise?.message}
                            onChange={handleActuatorPropertyChange}
                        />
                    </div>
                }
            </div>

            <div className="row">
                <div className="col text-right">
                    <Button label="Add" type="submit" size="sm" theme="primary" onClick={handleAddSubmit} />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Table columns={actuatorColumns} data={actuatorRows} primaryActionButton={primaryButton} />
                </div>
            </div>

        </div>
    );

};

export default ActuatorForm;