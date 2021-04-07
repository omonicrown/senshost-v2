import React from "react";
import { SharedProps } from "../home/Home";
import PageTitle from "../shared/PageTitle";

import ReactFlow from "react-flow-renderer";

import EventBody from "./sections/EventBody";

export interface RulesHolderProps extends SharedProps {

}

const RulesHolder: React.FunctionComponent<RulesHolderProps> = (props: RulesHolderProps): React.ReactElement<void> => {

    return (
        <div className="rules-container">
            <PageTitle title="Rules engine" />
            <div className="rules-holder">
                <EventBody />
            </div>
        </div>
    );
};

export default RulesHolder;