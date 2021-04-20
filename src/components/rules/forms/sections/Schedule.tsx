import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Datepicker } from "@sebgroup/react-components/dist/Datepicker";

import React from "react";
import { TriggerFormModel } from "../Trigger";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";

interface ScheduledProps {
    loading: boolean;
    trigger: TriggerFormModel;
    sourceTypes: Array<DropdownItem>;
    handleTriggerDropDownChange: (value: DropdownItem, type: "deviceId" | "sourceId" | "sourceType") => void;
    handleTriggerTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTriggerStartDateChange: (value: Date) => void;
}

const Schedule: React.FC<ScheduledProps> = (props: ScheduledProps): React.ReactElement<void> => {
    console.log("Recently is ", props.trigger)
    return (
        <React.Fragment>
            <div className="row">
                <Dropdown
                    label="Source Type"
                    name="sourceType"
                    list={props?.sourceTypes}
                    className="col"
                    disabled={props?.loading}
                    selectedValue={props.trigger?.sourceType}
                    error={null}
                    onChange={(value: DropdownItem) => props.handleTriggerDropDownChange(value, "sourceType")}
                />
            </div>
            {props.trigger?.sourceType?.value === "recurring" &&
                <div className="row">
                    <TextBoxGroup
                        label="Cadence"
                        name="sourceId"
                        className="col"
                        disabled={props?.loading}
                        value={props.trigger?.sourceId as string || ""}
                        error={null}
                        onChange={props.handleTriggerTextChange}
                    />
                </div>
            }

            <div className="row">
                <Datepicker
                    label="Start date"
                    name="deviceId"
                    className="col"
                    disabled={props?.loading}
                    value={props.trigger?.deviceId as Date}
                    error={null}
                    minDate={new Date()}
                    clearable
                    onChange={props.handleTriggerStartDateChange}
                />
            </div>

        </React.Fragment>
    );
};


export default Schedule;