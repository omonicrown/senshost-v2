import React from "react";


const EventProperties: React.FC = (): React.ReactElement<void> => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: "default" | "input" | "output") => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className="properties-holder">
            <div className="description">properties</div>
        </aside>
    );
};

export default EventProperties;
