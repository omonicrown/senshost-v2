import React from "react";
import { SharedProps } from "../home/Home";
import PageTitle from "../shared/PageTitle";


import EventBody from "./sections/EventBody";
import { Button } from "@sebgroup/react-components/dist/Button";

export interface RulesHolderProps extends SharedProps {

}

const RulesHolder: React.FunctionComponent<RulesHolderProps> = (props: RulesHolderProps): React.ReactElement<void> => {

    return (
        <div className="rules-container">
            <PageTitle title="Rules engine">
                <Button label="Save" id="saveBtn" size="sm" theme="outline-primary" title="Add" onClick={null} />
            </PageTitle>
            <div className="rules-holder">
                <EventBody />
            </div>
        </div>
    );
};

export default RulesHolder;