import React from "react";
import { SharedProps } from "../home/Home";


import EventBody from "./sections/EventBody";

export interface RulesHolderProps extends SharedProps {

}

const RulesHolder: React.FunctionComponent<RulesHolderProps> = (props: RulesHolderProps): React.ReactElement<void> => {

    return (
        <>
            <EventBody />
        </>
    );
};

export default RulesHolder;