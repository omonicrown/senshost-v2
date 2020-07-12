import React, { useContext } from "react";
import "../../../styles/components/shared/modal.scss";

import { StepTracker } from "@sebgroup/react-components/dist/StepTracker";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";

import { DeviceModel, SensorModel } from "../../../interfaces/models";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { Button } from "@sebgroup/react-components/dist/Button";
import { toggleAddModalContext, AddModalToggleProps } from "../../home/Home";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../../utils/svgElement";
import DeviceForm from "./sections/DeviceForm";
import SensorsForm from "./sections/SensorsForm";

interface AddAndEditDeviceProps {

}
const AddAndEditDevice: React.FunctionComponent = (props: AddAndEditDeviceProps) => {
    const [stepTracker, setStepTracker] = React.useState<number>(0);
    const stepList: Array<string> = React.useMemo(() => ["Device", "Sensor", "Actuator", "Summary"], []);

    const modalContext: AddModalToggleProps = useContext<AddModalToggleProps>(toggleAddModalContext);

    const [device, setDevice] = React.useState<DeviceModel>({
        name: "",
        fields: []
    } as DeviceModel);

    const [selectedType, setSelectedType] = React.useState<DropdownItem>({} as DropdownItem);
    const handleDeviceTypeChange = React.useCallback((e: DropdownItem) => {
        setSelectedType(e);
        setDevice({ ...device, type: e.value });
    }, [device, selectedType]);

    const handleDeviceNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    }, [device.name]);


    const onCancel = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDevice({ name: "" } as DeviceModel);
        modalContext.setToggle(false);
    }, [device]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {

    }, [device]);

    const handleSensorSubmitChange = React.useCallback((values: Array<SensorModel>) => {
        setDevice({ ...device, fields: values });
    }, [device.fields])

    return (
        <div className="add-and-edit-device">
            <StepTracker step={stepTracker} list={stepList} onClick={(index: number) => setStepTracker(index)} />
            <form className='add-and-edit-form' onSubmit={handleSubmit}>
                {stepTracker === 0 &&
                    <DeviceForm
                        selectedType={selectedType}
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