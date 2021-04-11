import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import React from "react";
import { Edge, Elements, FlowElement } from "react-flow-renderer";

interface EngineFormProps {
    loading: boolean;
    handleEngineChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedElement: FlowElement & Edge;
    elements: Elements;
}

interface EngineFormModel {
    eventName: string;
    triggerName: string;
}

const EngineForm: React.FC<EngineFormProps> = (props: EngineFormProps): React.ReactElement<void> => {
    const [fields, setFields] = React.useState<EngineFormModel>({ eventName: "", triggerName: "" })

    React.useEffect(() => {
        const element: FlowElement = props.elements?.find((el: FlowElement) => el.id === props.selectedElement?.id);
        setFields({
            ...fields,
            eventName: element?.data?.nodeControls?.engine?.eventName,
            triggerName: element?.data?.nodeControls?.engine?.triggerName
        })
    }, [props.selectedElement, props.elements, setFields]);

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
                    onChange={props.handleEngineChange}
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
                    onChange={props.handleEngineChange}
                    disabled={props.loading}
                />
            </div>
        </div>
    )
};


export default EngineForm;