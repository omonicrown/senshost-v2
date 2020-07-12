import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { Table } from "@sebgroup/react-components/dist/Table";

import { DeviceModel, SensorModel } from "../../../../interfaces/models";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TableHeader, DataItem, PrimaryActionButton, TableRow } from "@sebgroup/react-components/dist/Table/Table";
import { Button } from "@sebgroup/react-components/dist/Button";

interface SensorsFormProps {
    handleSensorSubmitChange: (sensors: Array<SensorModel>) => void;
    device: DeviceModel;
}
const SensorsForm: React.FunctionComponent<SensorsFormProps> = (props: SensorsFormProps) => {
    const [sensor, setSensor] = React.useState<{ selectedSensor: DropdownItem, name: string }>({ selectedSensor: null, name: "" });
    const [sensors, setSensors] = React.useState<Array<SensorModel>>([]);
    const [sensorData, setSensorData] = React.useState<Array<DataItem<SensorModel>>>([]);
    const sensorTypes = React.useMemo(() => [{
        label: "decimal",
        value: 0
    },
    {
        label: "String",
        value: 1
    }, {
        label: "int",
        value: 2
    }, {
        label: "double",
        value: 3
    }], []);


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
        },
    }), [sensors, sensorData, setSensorData, setSensors]);

    const sensorColumns: Array<TableHeader> = React.useMemo(() => [{
        label: "Type",
        accessor: "dataType",
    }, {
        label: "Name",
        accessor: "name",
    }], []);

    const handleSensorNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSensor({ ...sensor, name: e.target.value });
    }, [sensor]);

    const handleAddSensor = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSensors([...sensors, { name: sensor.name, dataType: sensor?.selectedSensor?.value } as SensorModel]);
        e.preventDefault();
    }, [setSensors, sensors, sensor]);

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
                        label="Sensor type"
                        list={sensorTypes}
                        selectedValue={sensor?.selectedSensor}
                        onChange={handleDeviceTypeChange}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="name"
                        label="Sensor name"
                        placeholder="Name"
                        value={sensor?.name}
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
                    <Table columns={sensorColumns} data={sensorData} primaryActionButton={primaryButton} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default SensorsForm;