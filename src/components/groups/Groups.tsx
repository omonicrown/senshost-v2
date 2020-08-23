import React from "react";
import { SharedProps } from "../home/Home";

import GroupHolder from "./sections/GroupHolder";
import UsersHolder from "./sections/UsersHolder";

export interface GroupProps extends SharedProps {
}

const Groups: React.FunctionComponent<GroupProps> = (props: GroupProps): React.ReactElement<void> => {


    return (
        <div className="group-users-container">
            <div className="row">
                <div className="col">
                    <GroupHolder />
                </div>

                <div className="col">
                    <UsersHolder />
                </div>
            </div>
        </div>
    );

};

export default Groups;
