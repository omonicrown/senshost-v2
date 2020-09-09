import React from "react";

import { Dialogue } from "@sebgroup/react-components/dist/Dialogue";
import { Pagination } from "@sebgroup/react-components/dist/Pagination";

import Gauge from "../gauge";
import PortalComponent from "../shared/Portal";

import { SharedProps } from "../home/Home";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { GroupApis } from "../../apis/groupApis";
import { States } from "../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse, AxiosError } from "axios";
import { GroupModel, UserModel } from "../../interfaces/models";
import { Column, Table, DataItem, TableRow, TableHeader, PrimaryActionButton, FilterProps, FilterItem, ActionLinkItem } from "@sebgroup/react-components/dist/Table/Table";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import configs from "../../configs";
import { Button } from "@sebgroup/react-components/dist/Button";
import { icontypesEnum, SvgElement } from "../../utils/svgElement";
import { Icon } from "@sebgroup/react-components/dist/Icon";


import AddAndEditUser from "./forms/AddAndEditUser";
import { initialState } from "../../constants";
import { UserApis } from "../../apis/userApis";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { toggleNotification } from "../../actions";

export interface UsersProps extends SharedProps {
}

const Users: React.FunctionComponent<UsersProps> = (props: UsersProps): React.ReactElement<void> => {
    const authState = useSelector((states: States) => states.auth);
    const [paginationValue, setPagination] = React.useState<number>(1);
    const [users, setUsers] = React.useState<Array<UserModel>>(null);
    const [user, setUser] = React.useState<UserModel>({} as UserModel);
    // actions
    const dispatch = useDispatch();

    const groupState = useSelector((states: States) => states.groups)

    const [selectedGroup, setSelectedGroup] = React.useState<DropdownItem>(null);

    const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

    const primaryButton: PrimaryActionButton = React.useMemo(() => ({
        label: "Manage",
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { },
    }), []);

    const actionLinks: Array<ActionLinkItem> = React.useMemo(() => [
        {
            label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {
                setUser({
                    name: selectedRow["name"],
                    email: selectedRow["email"],
                    password: selectedRow["password"],
                    groupId: selectedRow["groupId"],
                    id: selectedRow["id"],
                } as UserModel);
                setModalProps({ ...modalProps, toggle: true });
            }
        },
        { label: "Delete", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => { } },
    ], []);

    // memos
    const data: Array<DataItem> = React.useMemo(() => users?.map((user: UserModel) => {
        const group: string = groupState?.groups?.find((item: GroupModel) => item?.id === user.groupId)?.name;

        return ({ ...user, groupName: group });
    }), [users, groupState]);

    // filter and show only used groups from the group list
    const groupOptions: Array<DropdownItem> = React.useMemo(() => {
        const groups: Array<DropdownItem> = groupState?.groups?.filter((group: GroupModel) => users?.some((user: UserModel) => user?.groupId === group.id))
            .map((newGroup: GroupModel): DropdownItem => {
                return { label: newGroup.name, value: newGroup.name }
            }) || [];

        console.log("Iyamura ", groups);
        return [{ label: "All", value: null }, ...groups];
    }, [users, groupState?.groups]);

    const columns: Array<Column> = React.useMemo((): Array<Column> => [
        {
            label: "Username",
            accessor: "name"
        },
        {
            label: "Group",
            accessor: "groupName"
        },
        {
            label: "Email",
            accessor: "email"
        },
        {
            label: "GroupID",
            accessor: "groupId",
            isHidden: true
        },
        {
            label: "id",
            accessor: "id",
            isHidden: true
        }
    ], []);

    const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

    const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, newUser: UserModel) => {
        if (newUser?.id) {
            UserApis?.updateUser(newUser)
                .then((response: AxiosResponse<UserModel>) => {
                    if (response.data) {
                        const notification: NotificationProps = {
                            theme: "success",
                            title: "Group added",
                            message: `Group updated successfully`,
                            toggle: true,
                            onDismiss: () => { }
                        };

                        dispatch(toggleNotification(notification));

                        const updatedusers: Array<UserModel> = users?.map((item: UserModel) => {
                            if (item?.id === newUser.id) {
                                return newUser;
                            }

                            return item;
                        });

                        setUsers(updatedusers);
                    }
                })
                .finally(() => {
                    setModalProps({ ...modalProps, toggle: false });
                    setUser({} as UserModel);
                });

        } else {
            UserApis.createUser({ ...newUser, accountId: authState?.auth?.account?.id })
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
                    }
                })
                .finally(() => {
                    setModalProps({ ...modalProps, toggle: false });
                });
        }
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
            if (filterItem.accessor === "groupName" && selectedGroup?.value) {
                return { ...filterItem, filters: [selectedGroup?.value] };
            }

            return { ...filterItem, filters: [] };
        });

        setFilters(updatedFilterItems);
    }, [selectedGroup, setFilters]);

    React.useEffect(() => {
        UserApis.getUsersByAccountId(authState?.auth?.account?.id)
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
                    <Button label="" theme="outline-primary" title="Add" onClick={() => {
                        setUser({} as UserModel);
                        setModalProps({ ...modalProps, toggle: true });
                    }}>
                        <Icon src={<SvgElement type={icontypesEnum.ADD} />} /> Add
                    </Button>
                </div>
            </div>
            <div className="group-holder">
                <div className="table-filter-holder">
                    <div className="d-flex">
                        <Dropdown
                            label=""
                            list={groupOptions}
                            selectedValue={selectedGroup}
                            onChange={(value: DropdownItem) => setSelectedGroup(value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card-container">
                            <div className="card">
                                <Table
                                    columns={columns}
                                    data={data}
                                    actionLinks={actionLinks}
                                    offset={configs.tablePageSize}
                                    currentpage={paginationValue}
                                    primaryActionButton={primaryButton}
                                    filterProps={filterProps}
                                    footer={<Pagination value={paginationValue} onChange={setPagination} size={data?.length} useFirstAndLast={true} />}
                                    sortProps={{
                                        onAfterSorting: (rows: Array<TableRow>, sortByColumn: TableHeader) => { },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <PortalComponent>
                <Modal
                    {...modalProps}
                    onDismiss={() => setModalProps({ ...modalProps, toggle: false })}
                    header={<h3>Create User</h3>}
                    body={
                        <AddAndEditUser user={user} onSave={handleSave} onCancel={onCancel} groups={groupState?.groups} />
                    }
                    ariaLabel="My Label"
                    ariaDescribedby="My Description"
                />
            </PortalComponent>
        </div>
    );

};

export default Users;
