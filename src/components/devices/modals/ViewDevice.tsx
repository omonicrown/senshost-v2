import React from "react";
import { DeviceModel, SensorModel, ActuatorModel } from "../../../interfaces/models";
import { SensorApis } from "../../../apis/sensorApis";
import { ActuatorApis } from '../../../apis/actuatorApis';
import { AxiosResponse, AxiosError } from "axios";

import SummaryForm from "../add-edit-device/sections/SummaryForm";

interface ViewDeviceProps {
    device: DeviceModel;
}

const ViewDevice: React.FunctionComponent<ViewDeviceProps> = (props: ViewDeviceProps) => {
    const [device, setDevice] = React.useState<DeviceModel>({ } as DeviceModel);
    const [actuators, setActuators] = React.useState<Array<ActuatorModel>>(null);
    const [sensors, setSensors] = React.useState<Array<SensorModel>>(null);

    // api calls

    const getSensors = React.useCallback(() => {
        SensorApis.getSensorsByDeviceId(props?.device?.id)
            .then((response: AxiosResponse<Array<SensorModel>>) => {
                if (response?.data) {
                    setSensors(response.data);
                }
            }).catch((error: AxiosError) => {
                setSensors([]);
            });
    }, [setSensors]);

    const getActuators = React.useCallback(() => {
        ActuatorApis.getActuatorsByDeviceId(props?.device?.id)
            .then((response: AxiosResponse<Array<ActuatorModel>>) => {
                if (response?.data) {
                    setActuators(response.data);
                }
            }).catch((error: AxiosError) => {
                setActuators([]);
            });
    }, [setActuators]);

    React.useEffect(() => {
        setDevice(props?.device);
        getActuators();
        getSensors();
    }, [props?.device, setDevice]);

    return (
        <div className="view-device-container">
            <SummaryForm device={{...device, fields: sensors, actuators: actuators}} />
        </div>
    )

};

export default ViewDevice;