import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { Table } from "@sebgroup/react-components/dist/Table";

import { DeviceModel, SensorModel } from "../../../../interfaces/models";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TableHeader, DataItem, PrimaryActionButton, TableRow } from "@sebgroup/react-components/dist/Table/Table";
import { Button } from "@sebgroup/react-components/dist/Button";
import { SENSORSTYPES, SENSORSTYPESCOLUMN } from "../../../../constants";

interface SensorsFormProps {
    handleSensorSubmitChange: (sensors: Array<SensorModel>) => void;
    device: DeviceModel;
}
const SensorsForm: React.FunctionComponent<SensorsFormProps> = (props: SensorsFormProps) => {
    const [sensor, setSensor] = React.useState<{ selectedSensor: DropdownItem, name: string }>({ selectedSensor: null, name: "" });
    const [sensorError, setSensorError] = React.useState<{ type: string, name: string }>({ type: "", name: "" });

    const [sensors, setSensors] = React.useState<Array<SensorModel>>([]);
    const [sensorData, setSensorData] = React.useState<Array<DataItem<SensorModel>>>([]);
    const sensorTypes = React.useMemo(() => SENSORSTYPES, []);


    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Delete",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => {
            const indexOfSensorToBeRemoved: number = sensors?.findIndex((s: SensorModel) => s.name === selectedRow["name"]);
            const updatedSensors: Array<SensorModel> = [
                ...sensors?.slice(0, indexOfSensorToBeRemoved),
                ...sensors?.slice(indexOfSensorToBeRemoved + 1)
            ];

            const updatedSensorData: Array<DataItem<SensorModel>> = [
                ...sensorData?.slice(0, selectedRow.rowIndex),
                ...sensorData?.slice(selectedRow.rowIndex + 1)
            ];

            setSensorData(updatedSensorData);
            setSensors(updatedSensors);
            props?.handleSensorSubmitChange(updatedSensors);
        },
    }), [sensors, sensorData, setSensorData, setSensors, props]);

    const sensorColumns: Array<TableHeader> = React.useMemo(() => SENSORSTYPESCOLUMN, []);

    const handleSensorNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSensor({ ...sensor, name: e.target.value });
    }, [sensor]);

    const handleAddSensor = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let error: { name: string, type: string } = null;
        if (!sensor?.name || !sensor?.selectedSensor) {
            if (!sensor?.name) {
                error = { ...error, name: "Sensor name cannot be empty" };
            }
            if (!sensor?.selectedSensor) {
                error = { ...error, type: "Please select type" };
            }
        } else {
            const updatedSensors: Array<SensorModel> = [...sensors, { name: sensor.name, dataType: sensor?.selectedSensor?.value } as SensorModel];
            setSensors(updatedSensors);

            props?.handleSensorSubmitChange(updatedSensors);
        }
        setSensorError(error);
        e.preventDefault();
    }, [setSensors, sensors, sensor, props]);

    const handleDeviceTypeChange = React.useCallback((e: DropdownItem) => {
        setSensor({ ...sensor, selectedSensor: e });
    }, [sensor]);


    React.useEffect(() => {
        const data: Array<DataItem<SensorModel>> = sensors?.map((sensor) => ({ dataType: sensor.dataType, name: sensor.name })) as Array<DataItem<SensorModel>>;
        setSensorData(data);
        setSensor({ name: "", selectedSensor: null });
    }, [sensors]);

    React.useEffect(() => {
        setSensors(props?.device?.fields);
    }, []);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <Dropdown
                        label="Sensor data type"
                        list={sensorTypes}
                        selectedValue={sensor?.selectedSensor}
                        onChange={handleDeviceTypeChange}
                        error={sensorError?.type}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="name"
                        label="Sensor name"
                        placeholder="Name"
                        value={sensor?.name}
                        error={sensorError?.name}
                        onChange={handleSensorNameChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col text-right">
                    <Button label="Add" size="sm" theme="primary" onClick={handleAddSensor} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card my-3">
                        <div className="card-body">
                            <Table columns={sensorColumns} data={sensorData} primaryActionButton={primaryButton} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SensorsForm;