import { Button } from "@sebgroup/react-components/dist/Button";
import React from "react";

import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    Background,
    Elements,
    updateEdge,
    FlowElement
} from "react-flow-renderer";
import EventControls from "./EventControls";
import EventProperties from "./EventProperties";


let id = 0;
const getId = () => `dndnode_${id++}`;

const initialElements = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

export type RuleTypes = "string" | "time" | "number";
export type RuleActionTypes = "email" | "publish" | "actuator" | "expression";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [elements, setElements] = React.useState<Elements>([]);
    const [selectedElement, setSelectedElement] = React.useState<FlowElement>();

    // gets called after end of edge gets dragged to another source or target

    const onEdgeUpdate = (oldEdge, newConnection) =>
        setElements((els) => updateEdge(oldEdge, newConnection, els));

    const onConnect = (params) => setElements((els: Elements) => addEdge(params, els));

    const onElementsRemove = React.useCallback((elementsToRemove: Elements) => {
        setSelectedElement(null);
        setElements((els) => removeElements(elementsToRemove, els));
    }, [setSelectedElement]);

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const getNodeLabel = (nodeType: "default" | "input" | "output", ruleType: RuleActionTypes | RuleTypes | "engine"): string => {
        switch (ruleType) {
            case "actuator":
                return `Actuator Action`;
            case "email":
                return "Email Action";
            case "number":
                return "Number Rule";
            case "string":
                return "String Rule";
            case "publish":
                return "Publish Action";
            case "expression":
                return "Expression Action"; 
            case "time":
                return "Time Rule";    
            default:
                return "Engine";
        }
    }
    const onDrop = React.useCallback((event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
        const type = event.dataTransfer?.getData('application/reactflow-node-type');
        const ruleType = event.dataTransfer?.getData('application/reactflow-rule-type');

        const position = reactFlowInstance?.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: getNodeLabel(type, ruleType) },
        };

        setElements((es) => es.concat(newNode));
    }, [reactFlowWrapper, reactFlowInstance, setElements]);


    const onRemoveNode = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onElementsRemove([selectedElement]);
    }, [setElements, selectedElement]);

    const onElementClick = React.useCallback((event: React.MouseEvent<Element, MouseEvent>, element: FlowElement<any>) => {
        event.preventDefault();
        setSelectedElement(element);
    }, [setSelectedElement]);

    const onPanelClick = React.useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
        setSelectedElement(null);
    }, [setSelectedElement]);

    return (
        <div className="rule-engine-body d-flex">
            <ReactFlowProvider>
                <EventControls />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onEdgeUpdate={onEdgeUpdate}
                        onPaneClick={onPanelClick}
                        onElementClick={onElementClick}
                    >
                        <Controls />
                        <Background color="#aaa" gap={16} />

                        {selectedElement && <div className="controls-holder">
                            <Button label="Delete" theme="danger" onClick={onRemoveNode} size="sm" id="signin" />
                        </div>
                        }
                    </ReactFlow>
                </div>
                <EventProperties />
            </ReactFlowProvider>
        </div>
    );
};

export default EventBody;