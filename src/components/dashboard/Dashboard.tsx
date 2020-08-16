import React from "react";
import { SharedProps } from "../home/Home";
import Gauge from "../gauge";

export interface DashboardProps extends SharedProps {

}

const Dashboard: React.FunctionComponent<DashboardProps> = React.memo((props: DashboardProps): React.ReactElement<void> => {

    return (
        <div className="dashboard-container">
            <div className="row no-gutters">
                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="rectangle" data={[0.6]} />
                    </div>
                </div>

                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="circle" data={[0.5]} />
                    </div>
                </div>

                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="tears" data={[0.3]} />
                    </div>
                </div>
                <div className="col-sm-3 col-12">
                    <div className="gadgetPanel">
                        <Gauge type="tears" data={[0.3]} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Dashboard;