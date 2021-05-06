import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { TextArea } from "@sebgroup/react-components/dist/TextArea";

import React from "react";
import { ActionModel } from "../../../../interfaces/models";
import { HTTPREQUESTMETHODS } from "../../../../constants";
import { Edge, Elements, FlowElement } from "react-flow-renderer";


interface NewActionSectionProps {
    action: ActionModel;
    loading: boolean;
    actionTypes: Array<DropdownItem>
    handleActionsDropdownChange: (value: DropdownItem, field: "action" | "actionType") => void;
    handleActionsPropertyDropdownChange: (value: DropdownItem, type: "httpMethod") => void;
    handleActionsTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleActionsPropertyTextChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    selectedElement: FlowElement & Edge;
    elements: Elements;
}

interface PropertyProps {
    url?: string;
    body?: string;
    httpMethod?: DropdownItem;
}

interface NewActionObject extends ActionModel {
    property: PropertyProps;
    actionType: DropdownItem;
}

const NewActionSection: React.FC<NewActionSectionProps> = (props: NewActionSectionProps): React.ReactElement<void> => {
    const [action, setAction] = React.useState<NewActionObject>({ name: "" } as NewActionObject);
    const [actionError, setActionError] = React.useState<NewActionObject>({ name: "" } as NewActionObject);
    const httpMethods: Array<DropdownItem> = [{ label: "Please select", value: null }, ...HTTPREQUESTMETHODS];


    React.useEffect(() => {
        const element: FlowElement = props.elements?.find((el: FlowElement) => el.id === props.selectedElement?.id);
        const selectedActionType: DropdownItem = props.actionTypes?.find((type: DropdownItem) => type.value === element?.data?.nodeControls?.actions?.newAction?.actionType);

        setAction({
            ...action,
            property: {
                ...action?.property,
                httpMethod: element?.data?.nodeControls?.actions?.newAction?.property?.httpMethod,
                body: element?.data?.nodeControls?.actions?.newAction?.property?.body || "",
                url: element?.data?.nodeControls?.actions?.newAction?.property?.url || "",
            },
            name: element?.data?.nodeControls?.actions?.newAction?.name || "",
            actionType: selectedActionType,
        })
    }, [props.selectedElement, props.elements, setAction]);

    return (
        <div className="new-action-section">
            <div className="row">
                <div className="col-12">
                    <TextBoxGroup
                        name="name"
                        label="Action name"
                        placeholder="Name"
                        value={action?.name}
                        disabled={props?.loading}
                        error={actionError?.name}
                        onChange={props.handleActionsTextChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className=" col-12">
                    <Dropdown
                        label="Action type"
                        list={props.actionTypes}
                        error={actionError?.type?.toString()}
                        selectedValue={action?.actionType}
                        onChange={(value: DropdownItem) => props.handleActionsDropdownChange(value, "actionType")}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextBoxGroup
                        name="url"
                        label="Url"
                        placeholder="Url Path"
                        value={action?.property?.url}
                        disabled={props?.loading}
                        error={actionError?.name}
                        onChange={props.handleActionsPropertyTextChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Dropdown
                        label="Http Method"
                        list={httpMethods}
                        error={actionError?.property?.httpMethod as any}
                        selectedValue={action?.property?.httpMethod}
                        onChange={(value: DropdownItem) => props.handleActionsPropertyDropdownChange(value, "httpMethod")}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextArea id="body" name="body" cols={3} onChange={props.handleActionsPropertyTextChange} error={actionError?.property?.body} value={action?.property?.body} placeholder="Action body" />
                </div>
            </div>

        </div>
    );
}

export default NewActionSection;