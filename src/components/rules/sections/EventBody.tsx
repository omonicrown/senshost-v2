import { Button } from "@sebgroup/react-components/dist/Button";
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import React from "react";

import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    Background,
    Elements,
    updateEdge,
    FlowElement,
    Edge
} from "react-flow-renderer";
import { DatasourceType } from "../../dashboardItem/modals/AddDashboardItem";
import EventControls from "./EventControls";
import EventProperties from "./EventProperties";


let id = 0;
const getId = () => `dndnode_${id++}`;

export type RuleTypes = "string" | "time" | "number";
export type RuleActionTypes = "email" | "publish" | "actuator" | "expression";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [elements, setElements] = React.useState<Elements>([]);
    const [selectedElement, setSelectedElement] = React.useState<FlowElement & Edge>();

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
                return `Actuator action`;
            case "email":
                return "Email action";
            case "number":
                return "Number rule";
            case "string":
                return "String rule";
            case "publish":
                return "Publish action";
            case "expression":
                return "Expression action";
            case "time":
                return "Time rule";
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
            id: `${ruleType}-${getId()}`,
            type,
            position,
            data: {
                label: getNodeLabel(type, ruleType),
                nodeControls: {
                    engine: { eventName: "", triggerName: "" },
                    rules: {},
                    actions: {},
                }
            },
        };

        setElements((es) => es.concat(newNode));
    }, [reactFlowWrapper, reactFlowInstance, setElements]);


    const onRemoveNode = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onElementsRemove([selectedElement]);
    }, [setElements, selectedElement]);

    const onElementClick = React.useCallback((event: React.MouseEvent<Element, MouseEvent>, element: FlowElement<any> & Edge) => {
        event.preventDefault();
        setSelectedElement(element);
    }, [setSelectedElement]);

    const onPanelClick = React.useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
        setSelectedElement(null);
    }, [setSelectedElement]);


    const handleEngineChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            engine: {
                                ...el.data.nodeControls.engine,
                                [event.target.name]: event.target.value
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [setElements, selectedElement]);

    const handleEdgeChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    return {
                        ...el,
                        data: { ...el?.data, [event.target.name]: event.target.value as "AND" | "OR" },
                        label: event.target.value
                    };
                }
                return el;
            })
        );

    }, [selectedElement, setElements]);

    const handleRulesDropDownChange = React.useCallback((value: DropdownItem, field: "device" | "deviceSource" | "sensor") => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            rules: {
                                ...el.data.nodeControls.rules,
                                [field]: value
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [selectedElement, setElements]);

    const handleDataSourceChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            rules: {
                                ...el.data.nodeControls.rules,
                                type: event.target.value as DatasourceType
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [selectedElement, setElements]);

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
                <EventProperties
                    element={selectedElement}
                    handleEngineChange={handleEngineChange}
                    elements={elements}
                    handleEdgeChange={handleEdgeChange}
                    handleRulesDropDownChange={handleRulesDropDownChange}
                    handleDataSourceChange={handleDataSourceChange}
                />
            </ReactFlowProvider>
        </div>
    );
};

export default EventBody;