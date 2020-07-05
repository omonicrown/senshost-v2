import React from "react";

import { Dialogue } from "@sebgroup/react-components/dist/Dialogue";

import Gauge from "../gauge";
import PortalComponent from "../shared/Portal";

import { toggleAddModalContext, AddModalToggleProps } from "../home/Home";

interface DevicesProps {
}
const Devices: React.FunctionComponent<DevicesProps> = (props: DevicesProps): React.ReactElement<void> => {

  const toggleAddModal: AddModalToggleProps = React.useContext(toggleAddModalContext);

  console.log("This context ")
  const handleSave = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggleAddModal.setToggle(false), [toggleAddModal])
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
        {({ toggle, setToggle }) => (
          <PortalComponent>
            <Dialogue
              header="Are you sure?"
              desc="Lorem ipsum dolor sit amet, ius quis veniam ad, mea id nemore probatus sensibus. Sed  lorem everti menandri cu, habeo."
              toggle={toggle}
              primaryBtn="Yes, delete it!"
              secondaryBtn="Cancel"
              secondaryAction={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setToggle(false)}
              primaryAction={handleSave}
              enableCloseButton
              enableBackdropDismiss
              onDismiss={(e: React.MouseEvent<any, MouseEvent>) => setToggle(false)}
            />
          </PortalComponent>
        )}

      </toggleAddModalContext.Consumer>
    </div>
  );

};

export default Devices;
