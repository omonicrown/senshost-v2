import React from "react";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: "default" | "input" | "output") => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="controls-holder">
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
              </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
              </div>
            <div className="dndnode output" onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
        </aside>
    );
};

export default EventBody;