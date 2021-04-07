import React from "react";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: "default" | "input" | "output") => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="controls-holder">
            <div className="description">You can drag these nodes to the pane on the right.</div>

            <h5 className="title">Engine</h5>
            <div className="rule-node input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Engine
            </div>

            <h5 className="title">Rules</h5>
            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                String
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Time
            </div>

            <div className="rule-node" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Number
              </div>

            <h5 className="title">Actions</h5>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output')} draggable>
                Email
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output')} draggable>
                Publish
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output')} draggable>
                Actuator
            </div>

            <div className="rule-node output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output')} draggable>
                Expression
            </div>

        </aside>
    );
};

export default EventBody;