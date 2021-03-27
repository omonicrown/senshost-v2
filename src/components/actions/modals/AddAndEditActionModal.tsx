import { Button } from "@sebgroup/react-components/dist/Button";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { TextArea } from "@sebgroup/react-components/dist/TextArea";

import React from "react";
import { ActionModel } from "../../../interfaces/models";
import { HTTPREQUESTMETHODS } from "../../../constants";
import { convertStringToJson } from "../../../utils/functions";


interface AddAndEditActionModalProps {
    onSave: (e: React.FormEvent<HTMLFormElement>, action: ActionModel) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    action: ActionModel;
    loading: boolean;
    actionTypes: Array<DropdownItem>
}

interface PropertyProps {
    url?: string;
    body?: string;
    httpMethod?: string;
}

interface ActionErrorModel extends PropertyProps, ActionModel {
    actionType: string;
}

const AddAndEditActionModal: React.FC<AddAndEditActionModalProps> = (props: AddAndEditActionModalProps): React.ReactElement<void> => {
    const [action, setAction] = React.useState<ActionModel>({ name: "" } as ActionModel);
    const [actionError, setActionError] = React.useState<ActionErrorModel>({ name: "" } as ActionErrorModel);
    const [property, setProperty] = React.useState<PropertyProps>({ url: "", httpMethod: "", body: "" });

    const httpMethods: Array<DropdownItem> = [{ label: "Please select", value: null }, ...HTTPREQUESTMETHODS];


    const [selectedType, setSelectedType] = React.useState<DropdownItem>({} as DropdownItem)
    const [selectedHttpMethod, setSelectedHttpMethod] = React.useState<DropdownItem>({} as DropdownItem)

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAction({ ...action, [e.target.name]: e.target.value });
    }, [action]);

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAction({ name: "" } as ActionModel);
        props.onCancel(e);
    }, [action]);

    const onSave = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        let error: ActionErrorModel;
        if (!action?.name) {
            error = { ...error, name: "Action name is required" };
        }

        if (!property?.body) {
            error = { ...error, body: "Body is required" };
        }

        if (selectedType?.value < 0) {
            error = { ...error, actionType: "Action type is required" };
        }

        if (!property?.httpMethod) {
            error = { ...error, httpMethod: "Action method is required" };
        }

        if (!property?.url) {
            error = { ...error, url: "Action url is required" };
        }

        if (!error) {
            const updatedProperty: string = JSON.stringify(property)
            props?.onSave(e, { ...action, properties: updatedProperty });
        }

        setActionError(error);

        e.preventDefault();
    }, [action, selectedType, property]);

    const handleActionTypeChange = React.useCallback((value: DropdownItem) => {
        setSelectedType(value);
        setAction({ ...action, type: value?.value });
    }, [action]);

    const handleActionHttpChange = React.useCallback((value: DropdownItem) => {
        setSelectedHttpMethod(value);
        setProperty({ ...property, httpMethod: value?.value });
    }, [property]);

    const handlePropertyChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    }, [property]);

    React.useEffect(() => {
        if (props?.action) {
            const updatedProperty: PropertyProps = convertStringToJson(props?.action?.properties);
            const selectedMethod: DropdownItem = httpMethods?.find((method: DropdownItem) => method?.value === updatedProperty?.httpMethod);
            const type: DropdownItem = props.actionTypes?.find((type: DropdownItem) => type?.value === props?.action?.type);

            setSelectedHttpMethod(selectedMethod);
            setSelectedType(type);
            setProperty({ ...property, body: updatedProperty?.body, httpMethod: updatedProperty?.httpMethod, url: updatedProperty?.url });
            setAction(props?.action);
        }
    }, [props.action]);

    return (
        <form className="add-and-edit-actio" onSubmit={onSave}>
            <div className="row">
                <div className="col-sm-6 col-12">
                    <TextBoxGroup
                        name="name"
                        label="Action name"
                        placeholder="Name"
                        value={action?.name}
                        disabled={props?.loading}
                        error={actionError?.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-6 col-12">
                    <Dropdown
                        label="Action type"
                        list={props.actionTypes}
                        error={actionError?.actionType}
                        selectedValue={selectedType}
                        onChange={handleActionTypeChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextBoxGroup
                        name="url"
                        label="Url"
                        placeholder="Url Path"
                        value={property?.url}
                        disabled={props?.loading}
                        error={actionError?.name}
                        onChange={handlePropertyChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Dropdown
                        label="Http Method"
                        list={httpMethods}
                        error={actionError?.httpMethod}
                        selectedValue={selectedHttpMethod}
                        onChange={handleActionHttpChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextArea id="body" name="body" cols={3} onChange={handlePropertyChange} error={actionError?.body} value={property?.body} placeholder="Action body" />
                </div>
            </div>
            <div className="row controls-holder">
                <div className="col-12 col-sm-6">
                    <Button label="Cancel" size="sm" disabled={props.loading} theme="outline-primary" onClick={onCancel} />
                </div>
                <div className="col-12 col-sm-6 text-right">
                    <Button label="Save" type="submit" size="sm" theme="primary" title="Save" onClick={null}>
                        <Loader toggle={props?.loading} />
                    </Button>
                </div>
            </div>

        </form>
    );
}

export default AddAndEditActionModal;