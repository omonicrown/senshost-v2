import React from "react";
import { RuleActionTypes, RuleTypes, TriggerTypes } from "./EventBody";

const EventControls: React.FC = (): React.ReactElement<void> => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: "default" | "input" | "output" | "selectorNode", ruleType: RuleActionTypes | RuleTypes | TriggerTypes, ruleCategory: "action" | "trigger" | "rule") => {
        event.dataTransfer.setData('application/reactflow-node-type', `${nodeType}-${ruleCategory}`);
        event.dataTransfer.setData('application/reactflow-rule-type', ruleType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="controls-holder">
            <div className="description">You can drag these nodes to the pane on the right.</div>

            <h5 className="title">Trigger</h5>
            <div className="rule-node input trigger-node" onDragStart={(event) => onDragStart(event, 'input', "dataReceived", "trigger")} draggable>
                OndataReceived
            </div>

            <div className="rule-node input trigger-node" onDragStart={(event) => onDragStart(event, 'input', "schedule", "trigger")} draggable>
                Schedule
            </div>

            <h5 className="title">Rules</h5>
            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "string", "rule")} draggable>
                String Rule
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "time", "rule")} draggable>
                Time Rule
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default', "number", "rule")} draggable>
                Number Rule
              </div>

            <h5 className="title">Actions</h5>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "email", "action")} draggable>
                Email Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "publish", "action")} draggable>
                Publish Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "actuator", "action")} draggable>
                Actuator Action
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output', "expression", "action")} draggable>
                Expression Action
            </div>

        </aside>
    );
};

export default EventControls;
