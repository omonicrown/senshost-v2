import { Button } from "@sebgroup/react-components/dist/Button";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { Table } from "@sebgroup/react-components/dist/Table";
import { Column, DataItem, PrimaryActionButton, TableRow } from "@sebgroup/react-components/dist/Table/Table";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import React from "react";
import { DASHBOARDPROPERTIES, PROPERTIESCOLUMNS, DASHBOARDITEMTYPES } from "../../../constants";
import { DashboardItemModel } from "../../../interfaces/models";
import { AuthState } from "../../../interfaces/states";

interface AddDashboardItemProps {
    authState: AuthState;
    onSave: (e: React.FormEvent<HTMLFormElement>, dashboardItem: DashboardItemModel) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    loading: boolean;
    dashboardItem?: DashboardItemModel;
}

interface PropertyItem {
    propertyName: string;
    propertyValue: string;
    propertyLabel: string;
    otherProperty?: string;
}

export interface DashboardPropertiesOptions {
    type: number;
    properties: Array<DropdownItem<string>>;
}

interface AddDashboardItemDisplayModel extends DashboardItemModel {
    displayProperties: Array<Partial<DataItem<PropertyItem>>>;
}

const AddDashboardItem: React.FC<AddDashboardItemProps> = (props: AddDashboardItemProps) => {
    const [dashboardItem, setDashboardItem] = React.useState<AddDashboardItemDisplayModel>({ name: '', type: null, dashboardId: null, possition: '', displayProperties: [], property: null });
    const [dashboardItemErrors, setDashboardItemErrors] = React.useState<DashboardItemModel>(null);
    const [dashboardItemPropertyErrors, setDashboardItemPropertyErrors] = React.useState<PropertyItem>(null);

    const dashboardItemTypes: Array<DropdownItem> = React.useMemo(() => [{ label: 'Please select', value: null }, ...DASHBOARDITEMTYPES], [])


    const [selectedItemType, setSelectedItemType] = React.useState<DropdownItem<number>>(dashboardItemTypes[0]);

    const propertyOptions: Array<DropdownItem<string>> = React.useMemo(() => {
        const selectedPropertyOptions: DashboardPropertiesOptions = DASHBOARDPROPERTIES.find((item: DashboardPropertiesOptions) => item?.type === selectedItemType?.value);

        if (selectedPropertyOptions) return [{ label: 'Please select', value: null }, ...selectedPropertyOptions.properties];

        return [{ label: 'Please select', value: null }, ...DASHBOARDPROPERTIES[0].properties];
    }, [selectedItemType]);

    const [selectedProperty, setSelectedProperty] = React.useState<DropdownItem<string>>(propertyOptions[0]);

    const [selectedPropertyValue, setSelectedPropertyValue] = React.useState<string>("");
    const [selectedOtherProperty, setSelectedOtherProperty] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const propertiesTableColumn: Array<Column> = React.useMemo(() => PROPERTIESCOLUMNS, []);


    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Delete",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => {
            const indexOfPropertyToBeRemoved: number = dashboardItem.displayProperties?.findIndex((p: PropertyItem) => p.propertyName === selectedRow["propertyName"]);

            const updatedProperties: Array<Partial<DataItem<PropertyItem>>> = [
                ...dashboardItem?.displayProperties.slice(0, indexOfPropertyToBeRemoved),
                ...dashboardItem?.displayProperties?.slice(indexOfPropertyToBeRemoved + 1)
            ];

            setDashboardItem({ ...dashboardItem, displayProperties: updatedProperties });
        },
    }), [dashboardItem]);


    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDashboardItem({ ...dashboardItem, [e.target.name]: e.target.value });
    }, [setDashboardItem, dashboardItem]);

    const handlePropertyDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedProperty(value);
    }, []);

    const handleItemDropdownChange = React.useCallback((value: DropdownItem) => {
        setSelectedItemType(value);
        setDashboardItem({ ...dashboardItem, type: Number(value?.value) });
    }, [setDashboardItem, dashboardItem, setSelectedItemType]);

    const handlePropertyValueChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedPropertyValue(e.target.value);
    }, [setSelectedPropertyValue]);


    const handleOtherPropertyLabelChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedOtherProperty(e.target.value);
    }, [setSelectedOtherProperty]);

    const handleAddProperty = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        let errors: PropertyItem = null;

        if (!selectedProperty?.value) {
            errors = { ...errors, propertyName: 'type cannot be empty' };
        }

        if (!selectedPropertyValue) {
            errors = { ...errors, propertyValue: 'value cannot be empty' };
        } else if (selectedProperty.value === "other") {
            if (!selectedOtherProperty) {
                errors = { ...errors, otherProperty: 'value cannot be empty' };
            }
        }
        if (!errors) {
            setDashboardItem({
                ...dashboardItem,
                displayProperties: [
                    ...dashboardItem?.displayProperties, {
                        propertyLabel: selectedProperty.value === "other" ? selectedOtherProperty : selectedProperty?.label,
                        propertyValue: selectedPropertyValue,
                        propertyName: selectedProperty.value === "other" ? selectedOtherProperty : selectedProperty.value,
                    }
                ]
            });
        }
        setDashboardItemPropertyErrors(errors);
    }, [selectedProperty, dashboardItem, selectedPropertyValue, selectedOtherProperty]);

    const onSave = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        let errors: DashboardItemModel = null;

        if (!dashboardItem.name) {
            errors = { ...errors, name: "name is required" };
        }

        if (dashboardItem.type === null) {
            errors = { ...errors, type: "select item type" as any };
        }

        if (!errors) {
            const updatedItem: AddDashboardItemDisplayModel = { ...dashboardItem, property: JSON.stringify(dashboardItem?.displayProperties) };
            props?.onSave(e, updatedItem);
        }

        setDashboardItemErrors(errors);
        e.preventDefault();

    }, [props?.authState?.auth, dashboardItem]);

    React.useEffect(() => {
        try {
            const parsedProperties: { [k: string]: string } = JSON.parse(props.dashboardItem?.property);
            const propertiesArray: Array<{ [k: string]: string }> = Object.keys(parsedProperties)
                .map((key: string): { [k: string]: string } => ({ accessor: key, label: key, value: parsedProperties[key] }));

            setDashboardItem({ ...dashboardItem, displayProperties: propertiesArray });
        } catch (err) {
            setDashboardItem({ ...dashboardItem, name: '', type: null, dashboardId: null, possition: '', displayProperties: [] });
        }
    }, [props?.dashboardItem]);

    return (
        <form className="add-dashboard-item" onSubmit={onSave}>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="name"
                        label="Name"
                        type="text"
                        disabled={props?.loading}
                        placeholder="Dashboard name"
                        value={dashboardItem?.name}
                        error={dashboardItemErrors?.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <Dropdown
                        label="Item Type"
                        list={dashboardItemTypes}
                        disabled={props?.loading}
                        selectedValue={selectedItemType}
                        error={dashboardItemErrors?.type as any}
                        onChange={handleItemDropdownChange}
                    />
                </div>
            </div>
            <fieldset className="properties-holder border p-2">
                <legend className="w-auto"><h6 className="custom-label"> Item Properties </h6></legend>
                <div className="row">
                    <div className="col">
                        <Dropdown
                            label="Type"
                            list={propertyOptions}
                            disabled={props?.loading}
                            selectedValue={selectedProperty}
                            error={dashboardItemPropertyErrors?.propertyName}
                            onChange={handlePropertyDropdownChange}
                        />
                    </div>
                    {selectedProperty?.value === "other" &&
                        <div className="col">
                            <TextBoxGroup
                                name="otherProperty"
                                label="Custom Property"
                                type="text"
                                disabled={props?.loading}
                                placeholder="Custom property label"
                                value={selectedOtherProperty}
                                error={dashboardItemPropertyErrors?.otherProperty}
                                onChange={handleOtherPropertyLabelChange}
                            />
                        </div>
                    }
                    <div className="col">
                        <TextBoxGroup
                            name="propertyValue"
                            label="value"
                            type="text"
                            disabled={props?.loading}
                            placeholder="Property value"
                            value={selectedPropertyValue}
                            error={dashboardItemPropertyErrors?.propertyValue}
                            onChange={handlePropertyValueChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right">
                        <Button label="Add" type="button" size="sm" theme="primary" onClick={handleAddProperty}>
                            <Loader toggle={loading} />
                        </Button>
                    </div>
                </div>
            </fieldset>
            <div className="row">
                <div className="col">
                    <div className="card my-4">
                        <div className="card-body">
                            <Table columns={propertiesTableColumn} data={dashboardItem?.displayProperties} primaryActionButton={primaryButton} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-sm-row flex-column controls-holder">
                <Button label="Cancel" size="sm" theme="outline-primary" onClick={props.onCancel} />
                <Button label="Save" type="submit" size="sm" theme="primary" title="Save" onClick={null}>
                    <Loader toggle={props.loading} />
                </Button>
            </div>
        </form>
    )
}

export default AddDashboardItem;