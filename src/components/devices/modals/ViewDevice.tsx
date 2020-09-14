import React from "react";
import { DeviceModel, SensorModel, ActuatorModel } from "../../../interfaces/models";
import { SensorApis } from "../../../apis/sensorApis";
import { ActuatorApis } from '../../../apis/actuatorApis';
import { AxiosResponse } from "axios";

import SummaryForm from "../add-edit-device/sections/SummaryForm";

interface ViewDeviceProps {
    device: DeviceModel;
}

const ViewDevice: React.FunctionComponent<ViewDeviceProps> = (props: ViewDeviceProps) => {
    const [device, setDevice] = React.useState<DeviceModel>({ actuators: [], id: null, name:""} as DeviceModel);

    // api calls

    const getSensors = React.useCallback(() => {
        console.log("It has been mounted ", props.device)
        SensorApis.getSensorsByDeviceId(props?.device?.id)
            .then((response: AxiosResponse<Array<SensorModel>>) => {
                if (response?.data) {
                    setDevice({ ...device, fields: response.data });
                }
            });
    }, [props?.device, device]);

    const getActuators = React.useCallback(() => {
        device?.fields?.forEach((field: SensorModel) => {
            ActuatorApis.getActuatorsByField(props?.device?.id)
                .then((response: AxiosResponse<Array<ActuatorModel>>) => {
                    console.log("Ikooo ", response.data);
                    if (response?.data) {
                        setDevice({ ...device, actuators: [...device.actuators, ...response.data] });
                    }
                });
        })
    }, [device, setDevice]);

    React.useEffect(() => {
        getActuators();
    }, [device?.fields]);

    React.useEffect(() => {
        console.log("The device is ", props.device)
        setDevice(props.device);
        getSensors();
    }, [props?.device]);

    return (
        <div className="view-device-container">
            <SummaryForm device={device} />
        </div>
    )

};

export default ViewDevice;