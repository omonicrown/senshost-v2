import React from "react";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { DeviceModel } from "../../../../interfaces/models";
import { DEVICETYPES } from "../../../../constants";

interface DeviceFormProps {
    selectedType: DropdownItem;
    handleDeviceTypeChange: (value: DropdownItem) => void;
    device: DeviceModel;
    handleDeviceNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeviceForm: React.FunctionComponent<DeviceFormProps> = (props: DeviceFormProps) => {
    const deviceTypes = React.useMemo(() => DEVICETYPES, []);

    return (
        <div className="row">
            <div className="col-sm-6 col-12">
                <Dropdown
                    label="Device type"
                    list={deviceTypes}
                    selectedValue={props.selectedType}
                    onChange={props.handleDeviceTypeChange}
                />
            </div>
            <div className="col-sm-6 col-12">
                <TextBoxGroup
                    name="name"
                    label="Device name"
                    placeholder="Name"
                    value={props.device?.name}
                    onChange={props.handleDeviceNameChange}
                />
            </div>
        </div>
    )

}

export default DeviceForm;