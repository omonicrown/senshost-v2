import React from "react";
import { SharedProps } from "../home/Home";
import PageTitle from "../shared/PageTitle";

import ReactFlow from "react-flow-renderer";

import EventBody from "./sections/EventBody";

export interface RulesHolderProps extends SharedProps {

}

const RulesHolder: React.FunctionComponent<RulesHolderProps> = (props: RulesHolderProps): React.ReactElement<void> => {
    const elements = [
        {
            id: '1',
            type: 'input', // input node
            data: { label: 'Input Node' },
            position: { x: 250, y: 25 },
        },
        // default node
        {
            id: '2',
            // you can also pass a React component as a label
            data: { label: <div>Default Node</div> },
            position: { x: 100, y: 125 },
        },
        {
            id: '3',
            type: 'output', // output node
            data: { label: 'Output Node' },
            position: { x: 250, y: 250 },
        },
        // animated edge
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
    ];

    return (
        <div className="rules-container">
            <PageTitle title="Rules" />
            <div className="rules-holder">
                <div className="rule-engine-body d-flex">
                    <EventBody />
                </div>
            </div>
        </div>
    );
};

export default RulesHolder;