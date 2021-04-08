import React from "react";
import { RuleActionTypes, RuleTypes } from "./EventBody";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: "default" | "input" | "output",  ruleType: RuleActionTypes | RuleTypes | "engine") => {
        event.dataTransfer.setData('application/reactflow-node-type', nodeType);
        event.dataTransfer.setData('application/reactflow-rule-type', ruleType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="controls-holder">
            <div className="description">You can drag these nodes to the pane on the right.</div>

            <h5 className="title">Engine</h5>
            <div className="rule-node input" onDragStart={(event) => onDragStart(event, 'input', "engine")} draggable>
                Rule Engine
            </div>

            <h5 className="title">Rules</h5>
            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "string")} draggable>
                String Rule
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "time")} draggable>
                Time Rule
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "number")} draggable>
                Number Rule
              </div>

            <h5 className="title">Actions</h5>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "email")} draggable>
                Email Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "publish")} draggable>
                Publish Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "actuator")} draggable>
                Actuator Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "expression")} draggable>
                Expression Action
            </div>

        </aside>
    );
};

export default EventBody;