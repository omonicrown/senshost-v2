import React from "react";

import { Dialogue } from "@sebgroup/react-components/dist/Dialogue";

import Gauge from "../gauge";
import PortalComponent from "../shared/Portal";

import { toggleAddModalContext, AddModalToggleProps } from "../home/Home";
import { Modal } from "@sebgroup/react-components/dist/Modal/Modal";
import { Button } from "@sebgroup/react-components/dist/Button";
import AddAndEditDevice from "./add-edit-device/AddAndEditDevice";

interface DevicesProps {
}
const Devices: React.FunctionComponent<DevicesProps> = (props: DevicesProps): React.ReactElement<void> => {

  const toggleAddModal: AddModalToggleProps = React.useContext(toggleAddModalContext);

  const handleSave = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toggleAddModal.setToggle(false);
  }, [toggleAddModal]);

  return (
    <div className="dashboard-container">

      <div className="row no-gutters">
        <div className="col-sm-3 col-12 gadgetPanel">
          <Gauge type="rectangle" data={[0.6]} />
        </div>

        <div className="col-sm-3 col-12 gadgetPanel">
          <Gauge type="circle" data={[0.5]} />
        </div>

        <div className="col-sm-3 col-12 gadgetPanel">
          <Gauge type="tears" data={[0.3]} />
        </div>
        <div className="col-sm-3 col-12 gadgetPanel">
          <Gauge type="tears" data={[0.3]} />
        </div>
      </div>
      <toggleAddModalContext.Consumer>
        {(modalProps) => (
          <PortalComponent>
            <Modal
              {...modalProps}
              onDismiss={() => modalProps.setToggle(false)}
              header={<h3>Create Device</h3>}
              body={
                <AddAndEditDevice />
              }
            
              ariaLabel="My Label"
              ariaDescribedby="My Description"
            />
          </PortalComponent>
        )}

      </toggleAddModalContext.Consumer>
    </div>
  );

};

export default Devices;
