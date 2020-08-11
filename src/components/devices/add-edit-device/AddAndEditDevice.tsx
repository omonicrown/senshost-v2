import React, { useContext } from "react";

import { DeviceApis } from "../../../apis/deviceApis";

import "../../../styles/components/shared/modal.scss";

import { StepTracker } from "@sebgroup/react-components/dist/StepTracker";
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";

import { DeviceModel, SensorModel, ActuatorModel, PositiveResponse } from "../../../interfaces/models";
import { Button } from "@sebgroup/react-components/dist/Button";
import { toggleAddModalContext, AddModalToggleProps } from "../../home/Home";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../../utils/svgElement";
import DeviceForm from "./sections/DeviceForm";
import SensorsForm from "./sections/SensorsForm";
import ActuatorForm from "./sections/ActuatorForm";
import SummaryForm from "./sections/SummaryForm";

import { AxiosResponse, AxiosError } from "axios";
import { useSelector } from "react-redux";
import { States } from "../../../interfaces/states";

interface AddAndEditDeviceProps {

}
const AddAndEditDevice: React.FunctionComponent = (props: AddAndEditDeviceProps) => {
    const [stepTracker, setStepTracker] = React.useState<number>(0);
    const stepList: Array<string> = React.useMemo(() => ["Device", "Sensor", "Actuator", "Summary"], []);
    const modalContext: AddModalToggleProps = useContext<AddModalToggleProps>(toggleAddModalContext);

    // account or profile ----------------------------
    const authState = useSelector((states: States) => states.auth);

    const [device, setDevice] = React.useState<DeviceModel>({
        name: "",
        widget: { name: "", type: 0, propertise: { ON: "", OFF: "", } } as ActuatorModel,
        accountId: null,
        groupId: null,
        fields: []
    } as DeviceModel);

    // actuator props---------------------------------------------------
    const [selectedActuatorType, setSelectedActuatorType] = React.useState<DropdownItem>({
        label: "Default",
        value: 0,
    } as DropdownItem);

    const handleActuatorTypeChange = React.useCallback((e: DropdownItem) => {
        setSelectedActuatorType(e);
        setDevice({ ...device, widget: { ...device?.widget, type: e.value } });
    }, [device, selectedActuatorType, setDevice]);

    const handleActuatorPropertyChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({
            ...device,
            widget: {
                ...device?.widget,
                propertise: {
                    ...device?.widget?.propertise, [e.target.name]: e.target.value
                }
            }
        });
    }, [device, setDevice]);

    const handleActuatorNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({ ...device, widget: { ...device?.widget, name: e.target.value } });
    }, [device, setDevice]);

    // device props ----------------------------------
    const [selectedDeviceType, setSelectedDeviceType] = React.useState<DropdownItem>({} as DropdownItem);
    const handleDeviceTypeChange = React.useCallback((e: DropdownItem) => {
        setSelectedDeviceType(e);
    }, [setSelectedDeviceType]);

    const handleDeviceNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    }, [device, setDevice]);

    const onCancel = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDevice({ name: "" } as DeviceModel);
        modalContext.setToggle(false);
    }, [device, setDevice]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        const createDeviceModel: any = { ...device, accountId: authState.auth?.account.id, widget: { ...device.widget, propertise: JSON.stringify(device?.widget?.propertise) } }
        console.log("Man is ", authState);
        DeviceApis.createDevice(createDeviceModel).then((response: AxiosResponse<PositiveResponse>) => {
            console.log("Ojenmab shutup ", response);
        }).catch((err: AxiosError) => {
            console.log("There are error in create ", err);
        })

        e.preventDefault();
    }, [device]);

    const handleSensorSubmitChange = React.useCallback((values: Array<SensorModel>) => {
        setDevice({ ...device, fields: values });
    }, [device]);


    React.useEffect(() => {
        setDevice({ ...device, type: selectedDeviceType?.value });
    }, [selectedDeviceType]);

    return (
        <div className="add-and-edit-device">
            <StepTracker step={stepTracker} list={stepList} onClick={(index: number) => setStepTracker(index)} />
            <form className='add-and-edit-form' onSubmit={handleSubmit}>
                {stepTracker === 0 &&
                    <DeviceForm
                        selectedType={selectedDeviceType}
                        handleDeviceTypeChange={handleDeviceTypeChange}
                        handleDeviceNameChange={handleDeviceNameChange}
                        device={device}
                    />
                }
                {stepTracker === 1 &&
                    <SensorsForm
                        device={device}
                        handleSensorSubmitChange={handleSensorSubmitChange}
                    />
                }
                {stepTracker === 2 &&
                    <ActuatorForm
                        device={device}
                        handleActuatorTypeChange={handleActuatorTypeChange}
                        handleActuatorNameChange={handleActuatorNameChange}
                        selectedActuatorType={selectedActuatorType}
                        handleActuatorPropertyChange={handleActuatorPropertyChange}
                    />
                }
                {stepTracker === 3 &&
                    <SummaryForm device={device} />
                }
                <div className="row controls-holder">
                    <div className="col-12 col-sm-6">
                        <Button label="Cancel" size="sm" theme="outline-primary" onClick={onCancel} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="d-flex justify-content-end next-and-previous">
                            {stepTracker > 0 && <Button label="" size="sm" theme="outline-primary" title="Previous" onClick={() => setStepTracker(stepTracker - 1)}>
                                <Icon src={<SvgElement type={icontypesEnum.PREVIOUS} />} />
                            </Button>}
                            {stepTracker < 3 &&
                                <Button label="" size="sm" theme="outline-primary" title="Next" onClick={() => setStepTracker(stepTracker + 1)}>
                                    <Icon src={<SvgElement type={icontypesEnum.NEXT} />} />
                                </Button>
                            }

                            {stepTracker === 3 &&
                                <Button label="Save" type="submit" size="sm" theme="primary" title="Save" onClick={null} />
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default AddAndEditDevice;