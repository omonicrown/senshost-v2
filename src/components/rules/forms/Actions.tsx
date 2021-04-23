import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { AxiosResponse } from "axios";
import React from "react";
import { Edge, Elements, FlowElement } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { ActionApis } from "../../../apis/actionApis";
import { ActionModel } from "../../../interfaces/models";
import { AuthState, States } from "../../../interfaces/states";

interface ActionsFormProps {
    loading: boolean;
    selectedElement: FlowElement & Edge;
    elements: Elements;
    handleActionsDropDownChange: (value: DropdownItem, field: "action") => void;
}

const ActionsForm: React.FC<ActionsFormProps> = (props: ActionsFormProps) => {
    const authState: AuthState = useSelector((states: States) => states?.auth);
    const [actions, setActions] = React.useState<Array<DropdownItem>>([{ label: "Select", value: null }, { label: "Create action", value: "action_create" }]);
    const [selectedAction, setSelectedAction] = React.useState<DropdownItem>(null);

    React.useEffect(() => {
        ActionApis.getActionsByAccountId(authState?.auth?.account?.id)
            .then((response: AxiosResponse<Array<ActionModel>>) => {
                const updatedData: Array<DropdownItem> = response?.data?.map((action: ActionModel) => {
                    return (
                        {
                            label: action.name,
                            value: action.id
                        }
                    )
                })
                setActions([...actions, ...updatedData]);
            });
    }, []);

    React.useEffect(() => {
        const element: FlowElement = props.elements?.find((el: FlowElement) => el.id === props.selectedElement?.id);
        setSelectedAction(element?.data?.nodeControls?.actions?.action);
    }, [props.selectedElement, props.elements]);

    return (
        <div className="action-properties-holder">
            <div className="row">
                <Dropdown
                    label="Action"
                    name="action"
                    list={actions}
                    className="col"
                    disabled={props?.loading}
                    selectedValue={selectedAction}
                    error={null}
                    onChange={(value: DropdownItem) => props.handleActionsDropDownChange(value, "action")}
                />
            </div>
        </div>
    )
};

export default ActionsForm;