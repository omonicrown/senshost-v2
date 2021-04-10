import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import React from "react";

interface EngineFormProps {
    loading: boolean;
}

interface EngineFormModel {
    eventName: string;
    triggerName: string;
}

const EngineForm: React.FC<EngineFormProps> = (props: EngineFormProps): React.ReactElement<void> => {
    const [fields, setFields] = React.useState<EngineFormModel>({ eventName: "", triggerName: "" })
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    }, [fields, setFields]);

    return (
        <div className="rule-properties-holder">
            <div className="row">
                <TextBoxGroup
                    name="eventName"
                    type="text"
                    className="col"
                    label="Event name"
                    placeholder="Event name"
                    value={fields?.eventName}
                    onChange={handleChange}
                    disabled={props.loading}
                />
            </div>

            <div className="row">
                <TextBoxGroup
                    name="triggerName"
                    label="Trigger name"
                    type="text"
                    className="col"
                    placeholder="Trigger name"
                    value={fields?.triggerName}
                    onChange={handleChange}
                    disabled={props.loading}
                />
            </div>
        </div>
    )
};


export default EngineForm;