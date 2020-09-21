import React from "react";
import { History } from "history";
import { ActuatorModel, DeviceModel } from "../../interfaces/models";
import { AxiosResponse, AxiosError } from "axios";

import SummaryForm from "../devices/add-edit-device/sections/SummaryForm";
import AddAndEditDevice from "../devices/add-edit-device/AddAndEditDevice";

import { DeviceApis } from "../../apis/deviceApis";
import { match, useHistory, useRouteMatch } from "react-router";
import { Button } from "@sebgroup/react-components/dist/Button";
import { initialState } from "../../constants";
import { Modal, ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import PortalComponent from "../shared/Portal";
import { Loader } from "@sebgroup/react-components/dist/Loader";
import { NotificationProps } from "@sebgroup/react-components/dist/notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, States } from "../../interfaces/states";
import { Dispatch } from "redux";
import { toggleNotification } from "../../actions";

export interface ViewDeviceProps {
}

const ViewDevice: React.FunctionComponent<ViewDeviceProps> = (props: ViewDeviceProps) => {
    const [device, setDevice] = React.useState<DeviceModel>({} as DeviceModel);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [modalEditDeviceModal, setModalEditDeviceModal] = React.useState<ModalProps>({ ...initialState });

    const [modalDeleteDeviceProps, setModalDeleteDeviceProps] = React.useState<ModalProps>({ ...initialState });


    const history: History = useHistory();

    const match: match = useRouteMatch();

    // actions------------------------
    const authState: AuthState = useSelector((states: States) => states?.auth);
    const dispatch: Dispatch = useDispatch();

    // event----------------------------
    const onSave = React.useCallback((e: React.FormEvent<HTMLFormElement>, device: DeviceModel) => {

        const createDeviceModel: DeviceModel = {
            ...device,
            accountId: authState.auth?.account.id,
            actuators: device?.actuators?.map((actuator: ActuatorModel) => {
                return {
                    ...actuator,
                    deviceId: device?.id,
                    accountId: authState.auth?.account.id,
                    propertise: JSON.stringify(actuator?.propertise) as any
                }
            })
        };

        setLoading(true);
        DeviceApis.updateDevice(createDeviceModel).then((response: AxiosResponse<DeviceModel>) => {
            if (response?.data) {
                const notification: NotificationProps = {
                    theme: "success",
                    title: "device added successfully",
                    message: `Deivce added successfully`,
                    toggle: true,
                    onDismiss: () => { }
                };

                dispatch(toggleNotification(notification));

                setDevice(response?.data);

                setModalEditDeviceModal({ ...modalEditDeviceModal, toggle: false });
            }
        }).catch((err: AxiosError) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }, [modalEditDeviceModal, device, authState, toggleNotification]);


    const onEditDevice = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalEditDeviceModal({ ...modalEditDeviceModal, toggle: true })
    }, [modalEditDeviceModal]);

    const onDismissEditDevice = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalEditDeviceModal({ ...modalEditDeviceModal, toggle: false });
    }, [modalEditDeviceModal]);

    const onDeleteDevice = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalDeleteDeviceProps({ ...modalDeleteDeviceProps, toggle: true })
    }, [modalDeleteDeviceProps]);

    const onDismissDeleteDevice = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModalDeleteDeviceProps({ ...modalDeleteDeviceProps, toggle: false })
    }, [modalDeleteDeviceProps]);

    // apis

    const handleDeleteDevice = React.useCallback((e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        DeviceApis.deleteDeviceById(device?.id)
            .then(() => {
                const notification: NotificationProps = {
                    theme: "success",
                    title: "device deleted",
                    message: `Device deleted successfully`,
                    toggle: true,
                    onDismiss: () => { }
                };

                dispatch(toggleNotification(notification));

                history.goBack();
            })
            .finally(() => {
                setLoading(false);
                setModalDeleteDeviceProps({ ...modalDeleteDeviceProps, toggle: false });
            });

        e.preventDefault();

    }, [device, modalDeleteDeviceProps, setLoading]);

    // effects

    React.useEffect(() => {
        const deviceId: string = match?.params["deviceId"];
        DeviceApis.getDeviceById(deviceId)
            .then((response: AxiosResponse<DeviceModel>) => {
                if (response?.data) {
                    setDevice(response?.data);
                }
            })

        return () => null;
    }, [])

    return (
        <div className="view-device-container">
            <div className="control-holder  d-flex">
                <Button id="btnBack" name="btnBack" label="Back" theme="outline-primary" size="sm" onClick={() => { history?.goBack(); }} />
                <div className="edit-and-delete-controls">
                    <Button id="btnDelete" name="btnDelete" label="Delete" theme="danger" size="sm" onClick={onDeleteDevice} />
                    <Button id="btnEdit" name="btnEdit" label="Edit" theme="primary" size="sm" onClick={onEditDevice} />
                </div>
            </div>
            <SummaryForm device={device} viewType="detail" />

            <PortalComponent>
                <Modal
                    {...modalDeleteDeviceProps}
                    onDismiss={onDismissDeleteDevice}
                    header={modalDeleteDeviceProps?.toggle ? <h4>Delete {device?.name} ?</h4> : null}
                    body={
                        modalDeleteDeviceProps?.toggle ?
                            <p>Are you sure you want to delete this ?</p>
                            : null
                    }
                    footer={
                        modalDeleteDeviceProps?.toggle ?
                            <div className="controls-holder d-flex flex-sm-row flex-column">
                                <Button label="Cancel" disabled={loading} theme="outline-primary" onClick={onDismissDeleteDevice} />
                                <Button label="Delete" theme="danger" onClick={handleDeleteDevice}>
                                    {<Loader toggle={loading} size='sm' />}
                                </Button>
                            </div>
                            : null
                    }
                />

                <Modal
                    {...modalEditDeviceModal}
                    size="modal-lg"
                    onDismiss={onDismissEditDevice}
                    header={modalEditDeviceModal?.toggle ? <h3>Edit Device</h3> : null}
                    body={
                        modalEditDeviceModal?.toggle ?
                            <AddAndEditDevice
                                onSave={onSave}
                                device={device}
                                loading={loading}
                                onCancel={onDismissEditDevice}
                                toggle={modalEditDeviceModal?.toggle}
                            />
                            : null
                    }
                />
            </PortalComponent>
        </div>
    )

};

export default ViewDevice;