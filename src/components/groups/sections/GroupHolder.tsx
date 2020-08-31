import React from "react";

import { Pagination } from "@sebgroup/react-components/dist/Pagination";

import PortalComponent from "../../shared/Portal";

import { SharedProps } from "../../home/Home";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { GroupApis } from "../../../apis/groupApis";
import { States } from "../../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse, AxiosError } from "axios";
import { GroupModel } from "../../../interfaces/models";
import { Column, Table, DataItem, TableRow, TableHeader, PrimaryActionButton, FilterProps, FilterItem } from "@sebgroup/react-components/dist/Table/Table";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import configs from "../../../configs";
import { Button } from "@sebgroup/react-components/dist/Button";
import { icontypesEnum, SvgElement } from "../../../utils/svgElement";
import { Icon } from "@sebgroup/react-components/dist/Icon";


import AddAndEditGroup from "./forms/AddAndEditGroup";
import { initialState } from "../../../constants";
import { toggleNotification } from "../../../actions";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

export interface GroupsProps extends SharedProps {
}

const GroupHolder: React.FunctionComponent<GroupsProps> = (props: GroupsProps): React.ReactElement<void> => {
    const authState = useSelector((states: States) => states.auth);
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [groups, setGroups] = React.useState<Array<GroupModel>>(null);

    const [selectedStatus, setSelectedStatus] = React.useState<DropdownItem>(null);
    const statuses: Array<DropdownItem> = React.useMemo(() => [
        { label: "All", value: null }, { label: "Active", value: 0 }, { label: "inActive", value: 1 }
    ], []);

    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Manage",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { },
    }), []);


    // actions
    const dispatch = useDispatch();

    // memos
    const data: Array<DataItem> = React.useMemo(() => groups?.map((group: GroupModel) => {
        const selectedGroup: string = statuses?.find((item: DropdownItem) => item?.value === group.status)?.label;
        return ({ ...group, statusType: selectedGroup });
    }), [groups, statuses]);

    const columns: Array<Column> = React.useMemo((): Array<Column> => [
        {
            label: "Group Name",
            accessor: "name"
        },
        {
            label: "Status",
            accessor: "statusType"
        },
        {
            label: "Status",
            accessor: "status",
            isHidden: true
        }
    ], []);

    const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, group: GroupModel) => {
        GroupApis.createGroup({ ...group, accountId: authState?.auth?.account?.id })
            .then((response: AxiosResponse<GroupModel>) => {
                if (response.data) {
                    const notification: NotificationProps = {
                        theme: "success",
                        title: "Group added",
                        message: `Group added successfully`,
                        toggle: true,
                        onDismiss: () => { }
                    };

                    dispatch(toggleNotification(notification));

                    setGroups([...groups, response.data]);
                    setModalProps({ ...modalProps, toggle: false });
                }
            });
    }, [modalProps, setGroups, setModalProps, dispatch]);

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalProps({ ...modalProps, toggle: false });
    }, [modalProps]);

    const filterProps: FilterProps = React.useMemo(() => ({
        onAfterFilter: (rows: Array<TableRow>) => { },
        filterItems: filters,
    }), [filters]);

    React.useEffect(() => {
        const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
            if (filterItem.accessor === "status" && selectedStatus?.value) {
                return { ...filterItem, filters: [selectedStatus?.value] };
            }
            return { ...filterItem, filters: [] };
        });

        setFilters(updatedFilterItems);
    }, [selectedStatus, setFilters]);


    React.useEffect(() => {
        GroupApis.getGroupsByAccount(authState?.auth?.account?.id)
            .then((response: AxiosResponse<Array<GroupModel>>) => {
                setGroups(response?.data || []);
            }).catch((error: AxiosError) => {
                setGroups([]);
            })
    }, []);

    return (
        <div className="group-container">
            <div className="control-holder">
                <Button label="" size="sm" theme="outline-primary" title="Add" onClick={() => setModalProps({ ...modalProps, toggle: true })}>
                    <Icon src={<SvgElement type={icontypesEnum.ADD} />} /> Add
                </Button>
            </div>
            <div className="group-holder">

                <div className="row table-filter-holder">
                    <div className="col">
                        <div className="d-flex">
                            <div className="col">
                                <Dropdown
                                    label=""
                                    list={statuses}
                                    selectedValue={selectedStatus}
                                    onChange={(value: DropdownItem) => setSelectedStatus(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table
                            columns={columns}
                            data={data}
                            offset={configs.tablePageSize}
                            currentpage={paginationValue}
                            primaryActionButton={primaryButton}
                            filterProps={filterProps}
                            footer={<Pagination value={paginationValue} onChange={setPagination} size={data?.length} useFirstAndLast={true} />}
                            sortProps={{
                                onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => { },
                            }} />
                    </div>
                </div>

            </div>

            <PortalComponent>
                <Modal
                    {...modalProps}
                    onDismiss={() => setModalProps({ ...modalProps, toggle: false })}
                    header={<h3>Create Group</h3>}
                    body={
                        <AddAndEditGroup onSave={handleSave} onCancel={onCancel} />
                    }
                    ariaLabel="My Label"
                    ariaDescribedby="My Description"
                />
            </PortalComponent>
        </div>
    );

};

export default GroupHolder;
