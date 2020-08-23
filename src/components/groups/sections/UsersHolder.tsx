import React from "react";

import { Dialogue } from "@sebgroup/react-components/dist/Dialogue";
import { Pagination } from "@sebgroup/react-components/dist/Pagination";

import Gauge from "../../gauge";
import PortalComponent from "../../shared/Portal";

import { SharedProps } from "../../home/Home";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { GroupApis } from "../../../apis/groupApis";
import { States } from "../../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse, AxiosError } from "axios";
import { GroupModel, UserModel } from "../../../interfaces/models";
import { Column, Table, DataItem, TableRow, TableHeader, PrimaryActionButton, FilterProps, FilterItem } from "@sebgroup/react-components/dist/Table/Table";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import configs from "../../../configs";
import { Button } from "@sebgroup/react-components/dist/Button";
import { icontypesEnum, SvgElement } from "../../../utils/svgElement";
import { Icon } from "@sebgroup/react-components/dist/Icon";


import AddAndEditUser from "./forms/AddAndEditUser";
import { initialState } from "../../../constants";
import { UserApis } from "../../../apis/userApis";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { toggleNotification } from "../../../actions";

export interface GroupsProps extends SharedProps {
}

const Groups: React.FunctionComponent<GroupsProps> = (props: GroupsProps): React.ReactElement<void> => {
    const authState = useSelector((states: States) => states.auth);
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [users, setUsers] = React.useState<Array<UserModel>>(null);

    // actions
    const dispatch = useDispatch();

    const groupState = useSelector((states: States) => states.groups)

    const [selectedGroup, setSelectedGroup] = React.useState<DropdownItem>(null);

    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Manage",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { },
    }), []);

    // memos
    const data: Array<DataItem> = React.useMemo(() => users?.map((user: UserModel) => {
        const group: string = groupState?.groups?.find((item: GroupModel) => item?.id === user.groupId)?.name;
        return ({ ...user, groupName: group });
    }), [users, groupState]);

    // filter and show only used groups from the group list
    const groupOptions: Array<DropdownItem> = React.useMemo(() => {
        return groupState?.groups?.filter((group: GroupModel) => users?.some((user: UserModel) => user?.groupId === group.id))
            .map((group: GroupModel): DropdownItem => {
                return { label: group.name, value: group.id }
            })
    }, [users, groupState?.groups]);

    const columns: Array<Column> = React.useMemo((): Array<Column> => [
        {
            label: "Username",
            accessor: "name"
        },
        {
            label: "Group",
            accessor: "groupName",
        }
    ], []);

    const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, user: UserModel) => {
        UserApis.createUser({ ...user, accountId: authState?.auth?.account?.id })
            .then((response: AxiosResponse<UserModel>) => {


                if (response.data) {
                    const notification: NotificationProps = {
                        theme: "success",
                        title: "Group added",
                        message: `Group added successfully`,
                        toggle: true,
                        onDismiss: () => { }
                    };

                    dispatch(toggleNotification(notification));

                    setUsers([response.data, ...users]);
                    setModalProps({ ...modalProps, toggle: false });
                }
            });
        setModalProps({ ...modalProps, toggle: false });
    }, [modalProps]);

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalProps({ ...modalProps, toggle: false });
    }, [modalProps]);

    const filterProps: FilterProps = React.useMemo(() => ({
        onAfterFilter: (rows: Array<TableRow>) => { },
        filterItems: filters,
    }), [filters]);

    React.useEffect(() => {
        const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
            if (filterItem.accessor === "name") {
                return { ...filterItem, filters: [selectedGroup?.value] };
            }
            return filterItem;
        });

        console.log("Tabbatar maka ", updatedFilterItems);
        setFilters(updatedFilterItems);
    }, [selectedGroup, setFilters]);


    React.useEffect(() => {
        UserApis.getUsersByGroup(authState?.auth?.account?.id)
            .then((response: AxiosResponse<Array<UserModel>>) => {
                setUsers(response?.data || []);
                // setGroups here 
            }).catch((error: AxiosError) => {
                console.log("error getting users", error);
                setUsers([]);
            })
    }, []);

    return (
        <div className="users-container">
            <div className="row control-holder">
                <div className="col-12 text-right">
                    <Button label="" size="sm" theme="outline-primary" title="Add" onClick={() => setModalProps({ ...modalProps, toggle: true })}>
                        <Icon src={<SvgElement type={icontypesEnum.ADD} />} /> Add
                    </Button>
                </div>
            </div>
            <div className="group-holder">
                <div className="row table-filter-holder">
                    <div className="col">
                        <div className="d-flex">
                            <div className="col-12 col-sm-6">
                                <Dropdown
                                    label=""
                                    list={groupOptions}
                                    selectedValue={selectedGroup}
                                    onChange={(value: DropdownItem) => setSelectedGroup(value)}
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
                    header={<h3>Create User</h3>}
                    body={
                        <AddAndEditUser onSave={handleSave} onCancel={onCancel} groups={groupState?.groups} />
                    }
                    ariaLabel="My Label"
                    ariaDescribedby="My Description"
                />
            </PortalComponent>
        </div>
    );

};

export default Groups;
