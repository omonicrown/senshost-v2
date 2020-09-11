import React from "react";

import { Pagination } from "@sebgroup/react-components/dist/Pagination";

import PortalComponent from "../shared/Portal";

import { SharedProps } from "../home/Home";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import AddAndEditDevice from "./add-edit-device/AddAndEditDevice";
import { DeviceApis } from "../../apis/deviceApis";
import { States, AuthState } from "../../interfaces/states";
import { useSelector, useDispatch } from "react-redux";
import { AxiosResponse, AxiosError } from "axios";
import { DeviceModel, ActuatorModel } from "../../interfaces/models";
import { Column, Table, DataItem, TableRow, TableHeader, PrimaryActionButton, FilterProps, FilterItem } from "@sebgroup/react-components/dist/Table/Table";
import { DEVICETYPES, initialState } from "../../constants";
import { DropdownItem, Dropdown } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import configs from "../../configs";
import { Button } from "@sebgroup/react-components/dist/Button";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../utils/svgElement";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { toggleNotification } from "../../actions";
import { dispatch } from "d3";
import { Dispatch } from "redux";
import { useHistory } from "react-router";
import { History } from "history";
import { AppRoutes } from "../../enums/routes";

export interface DevicesProps extends SharedProps {
  onToggle: (value: boolean) => void;
}

const Devices: React.FunctionComponent<DevicesProps> = (props: DevicesProps): React.ReactElement<void> => {
  const [paginationValue, setPagination] = React.useState<number>(1);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [devices, setDevices] = React.useState<Array<DeviceModel>>(null);

  const [selectedDeviceType, setSelectedDeviceType] = React.useState<DropdownItem>(null);
  const deviceTypes: Array<DropdownItem> = React.useMemo(() => DEVICETYPES, []);
  const [toggleAddDeviceModal, setToggleAddDeviceModal] = React.useState<ModalProps>({ ...initialState });

  const primaryButton: PrimaryActionButton = React.useMemo(() => ({
    label: "Manage",
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selectedRow: TableRow) => { },
  }), []);

  // actions
  const authState: AuthState = useSelector((states: States) => states?.auth);
  const dispatch: Dispatch = useDispatch();

  const history: History = useHistory();

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

  // memos
  const data: Array<DataItem> = React.useMemo(() => devices?.map((device: DeviceModel) => {
    const selectedDeviceType: string = deviceTypes?.find((item: DropdownItem) => item?.value === device.type)?.label;
    return ({ name: device.name, type: device.type, deviceType: selectedDeviceType });
  }), [devices, deviceTypes]);

  const columns: Array<Column> = React.useMemo((): Array<Column> => [
    {
      label: "Device Name",
      accessor: "name"
    },
    {
      label: "Device type",
      accessor: "deviceType"
    },
    {
      label: "type",
      accessor: "type",
      isHidden: true
    }
  ], []);

  const [filters, setFilters] = React.useState<Array<FilterItem>>(columns.map((column: Column) => ({ accessor: column.accessor, filters: [] })));

  const onSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, device: DeviceModel) => {
    const createDeviceModel: DeviceModel = {
      ...device,
      accountId: authState.auth?.account.id,
      actuators: device?.actuators?.map((actuator: ActuatorModel) => {
        return { ...actuator, propertise: JSON.stringify(actuator?.propertise) as any }
      })
    };

    DeviceApis.createDevice(createDeviceModel).then((response: AxiosResponse<DeviceModel>) => {
      if (response?.data) {
        const notification: NotificationProps = {
          theme: "success",
          title: "device added successfully",
          message: `Deivce added successfully`,
          toggle: true,
          onDismiss: () => { }
        };

        dispatch(toggleNotification(notification));

        setDevices([...devices, device]);

        setToggleAddDeviceModal({ ...toggleAddDeviceModal, toggle: false });
      }
    }).catch((err: AxiosError) => {
      console.log(err);
    });

  }, [toggleAddDeviceModal, setDevices, devices, dispatch, setToggleAddDeviceModal, toggleNotification]);

  const onDismissModal = React.useCallback(() => {
    setToggleAddDeviceModal({ ...toggleAddDeviceModal, toggle: false });
  }, [toggleAddDeviceModal, setToggleAddDeviceModal]);

  const filterProps: FilterProps = React.useMemo(() => ({
    onAfterFilter: (rows: Array<TableRow>) => { },
    filterItems: filters,
  }), [filters]);

  React.useEffect(() => {
    const updatedFilterItems: Array<FilterItem> = filters?.map((filterItem: FilterItem) => {
      if (filterItem.accessor === "type" && selectedDeviceType?.value) {
        return { ...filterItem, filters: [selectedDeviceType?.value] };
      }
      return filterItem;
    });
    setFilters(updatedFilterItems);
  }, [selectedDeviceType]);


  React.useEffect(() => {
    DeviceApis.getDevicesByAccount(authState?.auth?.account?.id)
      .then((response: AxiosResponse<Array<DeviceModel>>) => {
        console.log("Objective ", response);
        setDevices(response?.data || []);
      }).catch((error: AxiosError) => {
        console.log("error getting devices", error);
        setDevices([]);
      })
  }, []);

  return (
    <div className="device-container">
      <div className="device-holder">
        <div className="table-filter-and-control-holder d-flex flex-sm-row flex-column">
          <Dropdown
            placeholder="Filter By type"
            list={deviceTypes}
            selectedValue={selectedDeviceType}
            onChange={(value: DropdownItem) => setSelectedDeviceType(value)}
          />
          <Button
            label="Add"
            size="sm"
            theme="outline-primary"
            id="btnAdd"
            title="Add" onClick={() => setToggleAddDeviceModal({ ...toggleAddDeviceModal, toggle: true })} />
        </div>
        <div className="row">
          <div className="col">
            <div className="card-container">
              <div className="card">
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
        </div>

      </div>

      <PortalComponent>
        <Modal
          {...toggleAddDeviceModal}
          onDismiss={onDismissModal}
          header={<h3>Create Device</h3>}
          body={
            <AddAndEditDevice
              onSave={onSave}
              onCancel={onDismissModal}
              toggle={toggleAddDeviceModal?.toggle}
            />
          }

          ariaLabel="My Label"
          ariaDescribedby="My Description"
        />
      </PortalComponent>

    </div>
  );

};

export default Devices;
