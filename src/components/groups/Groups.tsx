import React from "react";

import { Pagination } from "@sebgroup/react-components/dist/Pagination";

import PortalComponent from "../shared/Portal";

import { SharedProps } from "../home/Home";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { Dialogue } from "@sebgroup/react-components/dist/Dialogue";

import { GroupApis } from "../../apis/groupApis";
import { States, AuthState } from "../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse, AxiosError } from "axios";
import { GroupModel } from "../../interfaces/models";
import { Column, Table, DataItem, TableRow, TableHeader, PrimaryActionButton, FilterProps, FilterItem, ActionLinkItem } from "@sebgroup/react-components/dist/Table/Table";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import configs from "../../configs";
import { Button } from "@sebgroup/react-components/dist/Button";
import { icontypesEnum, SvgElement } from "../../utils/svgElement";
import { Icon } from "@sebgroup/react-components/dist/Icon";


import AddAndEditGroup from "./forms/AddAndEditGroup";
import { initialState } from "../../constants";
import { toggleNotification } from "../../actions";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";

import GroupDetails from "./modals/GroupDetails";
import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { History } from "history";
import { AppRoutes } from "../../enums/routes";

export interface GroupsProps extends SharedProps {
}

const GroupHolder: React.FunctionComponent<GroupsProps> = (props: GroupsProps): React.ReactElement<void> => {
  const authState: AuthState = useSelector((states: States) => states?.auth);

  const history: History = useHistory();

  // actions
  const dispatch: Dispatch = useDispatch();

  const [paginationValue, setPagination] = React.useState<number>(1);
  const [groups, setGroups] = React.useState<Array<GroupModel>>(null);
  const [selectedGroupForView, setSelectedGroupForView] = React.useState<GroupModel>({} as GroupModel);
  const [selectedGroupForEdit, setSelectedGroupForEdit] = React.useState<GroupModel>({} as GroupModel);
  const [selectedGroupForDelete, setSelectedGroupForDelete] = React.useState<GroupModel>({} as GroupModel);

  const [selectedStatus, setSelectedStatus] = React.useState<DropdownItem>(null);
  const statuses: Array<DropdownItem> = React.useMemo(() => [
    { label: "All", value: null }, { label: "Active", value: 0 }, { label: "inActive", value: 1 }
  ], []);

  const [modalProps, setModalProps] = React.useState<ModalProps>({ ...initialState });

  const [groupDetailsModalProps, setGroupDetailsModalProps] = React.useState<ModalProps>({ ...initialState });
  const [groupDeleteModalProps, setGroupDeleteModalProps] = React.useState<boolean>(false);

  const primaryButton: PrimaryActionButton = React.useMemo(() => ({
    label: "View",
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => {
      setSelectedGroupForView({
        accountId: selectedRow['accountId'],
        name: selectedRow["name"],
        status: selectedRow["status"],
        id: selectedRow["id"],
        creationDate: selectedRow["creationDate"]
      });
    },
  }), []);


  const actionLinks: Array<ActionLinkItem> = React.useMemo(() => [
    {
      label: "Edit", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {
        setSelectedGroupForEdit({
          accountId: selectedRow['accountId'],
          name: selectedRow["name"],
          status: selectedRow["status"],
          id: selectedRow["id"],
          creationDate: selectedRow["creationDate"]
        });
      }
    },
    {
      label: "Delete", onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedRow: TableRow) => {
        setSelectedGroupForDelete({
          accountId: selectedRow['accountId'],
          name: selectedRow["name"],
          status: selectedRow["status"],
          id: selectedRow["id"],
          creationDate: selectedRow["creationDate"]
        });
      }
    },
  ], []);

  // memos
  const data: Array<DataItem> = React.useMemo(() => groups?.map((group: GroupModel) => {
    console.log("Hankalinsa ", group)
    const newGroup: string = statuses?.find((item: DropdownItem) => item?.value === group.status)?.label;
    return ({ ...group, statusType: newGroup, account: authState?.auth?.account?.name });
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
    },
    {
      label: "Date",
      accessor: "creationDate",
      isHidden: false
    },
    {
      label: "Account",
      accessor: "account",
      isHidden: false
    },
  ], []);

  const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

  const handleDelete = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("The selected group is ", selectedGroupForDelete)
    GroupApis.deleteGroup(selectedGroupForDelete?.id)
      .then((response: AxiosResponse) => {
        const notification: NotificationProps = {
          theme: "success",
          title: "Group deleted",
          message: `Group deleted successfully`,
          toggle: true,
          onDismiss: () => { }
        };
        const indexOfGroupTobeDeleted: number = groups?.findIndex((group: GroupModel) => group?.id === selectedGroupForDelete?.id);
        const updatedGroups = [
          ...groups?.slice(0, indexOfGroupTobeDeleted),
          ...groups?.slice(indexOfGroupTobeDeleted + 1)
        ];

        dispatch(toggleNotification(notification));

        setGroups(updatedGroups);
        setSelectedGroupForDelete({} as GroupModel);

        setGroupDeleteModalProps(false);
      });
  }, [selectedGroupForDelete, setSelectedGroupForDelete, setGroupDeleteModalProps]);

  const handleSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, group: GroupModel) => {
    if (group?.id) {

      GroupApis.updateGroup(group)
        .then((response: AxiosResponse<GroupModel>) => {
          if (response.data) {
            const notification: NotificationProps = {
              theme: "success",
              title: "Group updated",
              message: `Group updated successfully`,
              toggle: true,
              onDismiss: () => { }
            };

            dispatch(toggleNotification(notification));
            const updatedGroups: Array<GroupModel> = groups?.map((newGroup: GroupModel) => {
              if (newGroup?.id === group?.id) {
                return response?.data;
              }

              return newGroup;
            })
            setGroups(updatedGroups);
            setModalProps({ ...modalProps, toggle: false });
            setSelectedGroupForEdit({} as GroupModel);
          }
        });

    } else {
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
    }
  }, [modalProps, setGroups, setModalProps, dispatch]);

  const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setModalProps({ ...modalProps, toggle: false });
    setSelectedGroupForEdit({} as GroupModel);
  }, [modalProps]);

  const onCancelGroupDelete = React.useCallback((e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    setGroupDeleteModalProps(false);
    setSelectedGroupForDelete({} as GroupModel);
  }, []);

  const onCancelGroupDetailModal = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setGroupDetailsModalProps({ ...groupDetailsModalProps, toggle: false });
  }, [groupDetailsModalProps]);

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

  // if selected group id is set, render modal, else hide it
  React.useEffect(() => {
    if (selectedGroupForView?.id) {
      setGroupDetailsModalProps({ ...groupDetailsModalProps, toggle: true });
    } else {
      setGroupDetailsModalProps({ ...groupDetailsModalProps, toggle: false });
    }
  }, [selectedGroupForView]);

  React.useEffect(() => {
    if (selectedGroupForEdit?.id) {
      setModalProps({ ...modalProps, toggle: true });
    } else {
      setModalProps({ ...modalProps, toggle: false });
    }
  }, [selectedGroupForEdit]);

  React.useEffect(() => {
    if (selectedGroupForDelete?.id) {
      setGroupDeleteModalProps(true);
    } else {
      setGroupDeleteModalProps(false);
    }
  }, [selectedGroupForDelete]);

  React.useEffect(() => {
    GroupApis.getGroupsByAccount(authState?.auth?.account?.id)
      .then((response: AxiosResponse<Array<GroupModel>>) => {
        setGroups(response?.data || []);
      }).catch((error: AxiosError) => {
        setGroups([]);
      })
  }, []);

  React.useEffect(() => {
    if (!authState?.auth?.identityToken) {
      const notification: NotificationProps = {
        theme: "danger",
        title: "Unauthenticated user",
        message: `Please login to proceed`,
        onDismiss: () => { },
        toggle: true
      };

      dispatch(toggleNotification(notification));
      history.replace(AppRoutes.Account);
    }
  }, [authState]);

  return (
    <div className="group-container">
      <div className="control-holder">
        <Button label="" size="sm" theme="outline-primary" title="Add" onClick={() => {
          setModalProps({ ...modalProps, toggle: true });
          setSelectedGroupForEdit({} as GroupModel);
        }}>
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
              actionLinks={actionLinks}
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
          header={<h3>{selectedGroupForEdit?.id ? 'Edit Group' : 'Create Group'}</h3>}
          body={
            modalProps?.toggle ?
              <AddAndEditGroup
                onSave={handleSave}
                onCancel={onCancel}
                group={selectedGroupForEdit} /> : null
          }
        />
        <Modal
          {...groupDetailsModalProps}
          onDismiss={() => {
            setSelectedGroupForView({} as GroupModel)
          }}
          header={<h3>Group: {selectedGroupForView?.name}'s Users</h3>}
          body={
            groupDetailsModalProps?.toggle ?
              <GroupDetails
                onCancel={onCancelGroupDetailModal}
                group={selectedGroupForView}
                toggle={groupDetailsModalProps?.toggle}
              />
              : null
          }
        />

        <Modal
          {...groupDetailsModalProps}
          onDismiss={() => {
            setSelectedGroupForView({} as GroupModel)
          }}
          header={<h3>Group: {selectedGroupForView?.name}'s Users</h3>}
          body={
            groupDetailsModalProps?.toggle ?
              <GroupDetails
                onCancel={onCancelGroupDetailModal}
                group={selectedGroupForView}
                toggle={groupDetailsModalProps?.toggle}
              />
              : null
          }
        />

        <Dialogue
          header="Delete group?"
          desc={`Delete the group ${selectedGroupForDelete?.name}`}
          toggle={groupDeleteModalProps}
          primaryBtn="Yes, delete it!"
          secondaryBtn="Cancel"
          secondaryAction={(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onCancelGroupDelete(e)}
          primaryAction={handleDelete}
          enableCloseButton
          enableBackdropDismiss
          onDismiss={(e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => onCancelGroupDelete(e)}
        />
      </PortalComponent>
    </div>
  );

};

export default GroupHolder;
