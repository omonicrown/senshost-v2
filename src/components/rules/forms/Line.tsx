import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { RadioListModel } from "@sebgroup/react-components/dist/RadioGroup/RadioGroup";
import React from "react";

interface LineFormProps {
    loading: boolean;
}
const LineForm: React.FC<LineFormProps> = (props: LineFormProps): React.ReactElement<void> => {
    const [value, setValue] = React.useState<"AND" | "OR">("OR");

    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as "AND" | "OR");
    }, []);

    const list: Array<RadioListModel> = [{
        label: "AND",
        value: "AND",
    }, {
        label: "OR",
        value: "OR",
    }];

    return (
        <RadioGroup
            name="lineType"
            disableAll={props.loading}
            id="lineType"
            label="Connection type"
            value={value}
            condensed
            list={list}
            onChange={onChange}
        />
    );
};

export default LineForm;