import { Button } from "@sebgroup/react-components/dist/Button";
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { name } from "dayjs/locale/*";
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
    Edge,
    Position,
    getOutgoers,
    Node,
    getConnectedEdges
} from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RuleTriggerTYpes } from "../../../enums";
import { ActionModel, RuleModel, TriggerModel } from "../../../interfaces/models";
import { AuthState, States } from "../../../interfaces/states";
import { DatasourceType } from "../../dashboardItem/modals/AddDashboardItem";
import PageTitle from "../../shared/PageTitle";
import { TriggerFormModel } from "../forms/Trigger";
import EventControls from "./EventControls";
import EventProperties from "./EventProperties";


let id = 0;
const getId = () => `dndnode_${id++}`;

export type RuleTypes = "string" | "time" | "number";
export type TriggerTypes = "dataReceived" | "schedule";
export type RuleActionTypes = "email" | "publish" | "actuator" | "expression";

const EventBody: React.FC = (): React.ReactElement<void> => {
    const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
    const [elements, setElements] = React.useState<Elements>([]);
    const [selectedElement, setSelectedElement] = React.useState<FlowElement & Edge>();

    const authState: AuthState = useSelector((states: States) => states?.auth);


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

    const getNodeLabel = (nodeType: "default" | "input" | "output", ruleType: RuleActionTypes | RuleTypes | TriggerTypes): string => {
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
            case "dataReceived":
                return "OndataReceived";
            case "schedule":
                return "Schedule";
            default:
                return "Engine";
        }
    }
    const onDrop = React.useCallback((event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
        const types = event.dataTransfer?.getData('application/reactflow-node-type')?.split("-");
        const type = types[0];
        const nodeCategory = types[1];
        const ruleType = event.dataTransfer?.getData('application/reactflow-rule-type');

        const position = reactFlowInstance?.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        console.log("Does it work here ", nodeCategory);
        const newNode = {
            id: `${ruleType}-${getId()}`,
            type,
            position,
            style: { backgroundColor: nodeCategory === "trigger" && "#eee" },
            sourcePosition: nodeCategory === "trigger" ? Position.Right : Position.Bottom,
            targetPosition: nodeCategory === "trigger" ? Position.Left : Position.Top,
            data: {
                label: getNodeLabel(type, ruleType),
                nodeType: nodeCategory,
                nodeControls: {
                    trigger: { eventName: "", triggerName: "" },
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


    const handleTriggerTextChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            trigger: {
                                ...el.data.nodeControls.trigger,
                                [event.target.name]: event.target.value
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [setElements, selectedElement]);

    const handleTriggerStartDateChange = React.useCallback((event: Date) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            trigger: {
                                ...el.data.nodeControls.trigger,
                                deviceId: event
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [setElements, selectedElement]);

    const handleTriggerDropDownChange = React.useCallback((event: DropdownItem, type: "deviceId" | "sourceId" | "sourceType") => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    // it's important that you create a new object here
                    // in order to notify react flow about the change
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            trigger: {
                                ...el.data.nodeControls.trigger,
                                [type]: event.value
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

    const handleRulesDropDownChange = React.useCallback((value: DropdownItem, field: "device" | "deviceSource" | "sensor" | "operator" | "cadence") => {
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

    const handleRuleOperatorValueChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            rules: {
                                ...el.data.nodeControls.rules,
                                [event.target.name]: event.target.value as DatasourceType
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

    const handleActionsDropDownChange = React.useCallback((value: DropdownItem | ActionModel, field: "action" | "actionType") => {
        switch (field) {
            case "action": {
                setElements((els: Elements) =>
                    els.map((el: FlowElement & Edge) => {
                        if (el.id === selectedElement.id) {
                            el.data = {
                                ...el.data,
                                nodeControls: {
                                    ...el.data.nodeControls,
                                    actions: {
                                        ...el.data.nodeControls.actions,
                                        action: value
                                    }
                                }
                            };
                        }
                        return el;
                    })
                );
                break;
            }
            case "actionType":
                setElements((els: Elements) =>
                    els.map((el: FlowElement & Edge) => {
                        if (el.id === selectedElement.id) {
                            el.data = {
                                ...el.data,
                                nodeControls: {
                                    ...el.data.nodeControls,
                                    actions: {
                                        ...el.data.nodeControls.actions,
                                        newAction: { ...el.data.nodeControls.actions.newAction, [field]: value }
                                    }
                                }
                            };
                        }
                        return el;
                    })
                );
                break;
        }
    }, [selectedElement, setElements]);


    const handleActionsPropertyDropdownChange = React.useCallback((value: DropdownItem, type: "httpMethod") => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            actions: {
                                ...el.data.nodeControls.actions,
                                newAction: {
                                    ...el.data.nodeControls.actions.newAction,
                                    property: { ...el.data.nodeControls.actions.newAction.property, [type]: value }
                                }
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [selectedElement, setElements]);


    const handleActionsTextChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            actions: {
                                ...el.data.nodeControls.actions,
                                newAction: { ...el.data.nodeControls.actions.newAction, [e.target.name]: e.target.value }
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [selectedElement, setElements]);

    const handleActionsPropertyTextChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setElements((els: Elements) =>
            els.map((el: FlowElement & Edge) => {
                if (el.id === selectedElement.id) {
                    el.data = {
                        ...el.data,
                        nodeControls: {
                            ...el.data.nodeControls,
                            actions: {
                                ...el.data.nodeControls.actions,
                                newAction: {
                                    ...el.data.nodeControls.actions.newAction,
                                    property: {
                                        ...el.data.nodeControls?.actions?.newAction?.property,
                                        [e.target.name]: e.target.value
                                    }
                                }
                            }
                        }
                    };
                }
                return el;
            })
        );
    }, [selectedElement, setElements]);

    const handleSave = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        let payLoad: TriggerModel;

        let rulesNodes: Array<FlowElement> = [];
        let actionsNodes: Array<FlowElement> = [];
        let triggersNodes: Array<FlowElement> = [];
        let edgesNodes: Array<Edge> = [];

        for (let node of elements) {
            switch (node?.data?.nodeType) {
                case "rule":
                    rulesNodes.push(node);
                    break;
                case "action":
                    actionsNodes.push(node);
                    break;
                case "trigger":
                    triggersNodes.push(node);
                    break;
                default:
                    edgesNodes.push(node as Edge);
                    break;
            }
        };


        /**
         * Pseudo
         * 1. Select the first rule edge
         * 2. Select target node 
         */
        const firstRuleEdge: Edge = edgesNodes?.find((edge: Edge) =>
            edge?.source === triggersNodes[0]?.id || edge?.source === triggersNodes[1]?.id
        );

        const selectedTrigger: FlowElement = triggersNodes.find((trigger: FlowElement) => trigger?.id === firstRuleEdge?.source) || triggersNodes[0];

        const actions: Array<ActionModel> = actionsNodes?.map((action: FlowElement) => action?.data?.nodeControls?.actions?.newAction || action?.data?.nodeControls?.actions?.action);

        const ruleType: string = selectedTrigger?.id?.split("-")[0];
        let trigger: TriggerModel = {
            id: null,
            name: selectedTrigger?.data?.nodeControls?.trigger?.eventName,
            eventName: selectedTrigger?.data?.nodeControls?.trigger?.triggerName,
            type: RuleTriggerTYpes[ruleType],
            sourceType: selectedTrigger?.data?.nodeControls?.trigger?.sourceType?.value || selectedTrigger?.data?.nodeControls?.trigger?.sourceType,
            sourceId: selectedTrigger?.data?.nodeControls?.trigger?.sourceId?.value || selectedTrigger?.data?.nodeControls?.trigger?.sourceId,
            accountId: authState?.auth?.account?.id,
            deviceId: selectedTrigger?.data?.nodeControls?.trigger?.deviceId?.value || selectedTrigger?.data?.nodeControls?.trigger?.deviceId,
            rule: null,
            actions
        };
        const firstRuleNode: Node = getOutgoers(selectedTrigger as Node, elements)[0];
        let updatedRule: RuleModel = {
            title: firstRuleNode?.data.nodeControls.rules?.title,
            fieldId: firstRuleNode?.data.nodeControls.rules.sensor?.value || firstRuleNode?.data.nodeControls.rules.sensor,
            deviceId: firstRuleNode?.data.nodeControls.rules.deviceId?.value || firstRuleNode?.data.nodeControls.rules.deviceId,
            operator: firstRuleNode?.data.nodeControls.rules.operator?.value || firstRuleNode?.data.nodeControls.rules.operator,
            ruleType: 0,
            dataFieldSourceType: firstRuleNode?.data.nodeControls.rules.operator,
            value: firstRuleNode?.data.nodeControls.rules?.operatorValue,
            position: firstRuleNode?.position,
            and: null,
            or: null
        } as RuleModel;
        for (let rule of rulesNodes) {
            const generateRule = (recursiveRuleRule?: RuleModel) => {
                const nextNextRule: Node = getOutgoers(rule as Node, elements)[0];
                if (recursiveRuleRule?.and || recursiveRuleRule?.or) {
                    if (recursiveRuleRule?.and) {
                        generateRule(recursiveRuleRule?.and);
                    } else {
                        generateRule(recursiveRuleRule?.or);
                    }
                } else if (nextNextRule) {
                    const edges: Array<Edge> = getConnectedEdges(rulesNodes as Array<Node>, edgesNodes);
                    const selectedEdge: Edge = edges?.find((edge: Edge) => edge?.target === nextNextRule?.id);
                    recursiveRuleRule[`${selectedEdge?.label === 'OR' ? 'or' : 'and'}`] = {
                        title: nextNextRule?.data.nodeControls.rules?.title,
                        fieldId: nextNextRule?.data.nodeControls.rules.sensor?.value || nextNextRule?.data.nodeControls.rules.sensor,
                        deviceId: nextNextRule?.data.nodeControls.rules.deviceId?.value || nextNextRule?.data.nodeControls.rules.deviceId,
                        operator: nextNextRule?.data.nodeControls.rules.operator?.value || nextNextRule?.data.nodeControls.rules.operator,
                        ruleType: 0,
                        dataFieldSourceType: nextNextRule?.data.nodeControls.rules.operator,
                        value: nextNextRule?.data.nodeControls.rules?.operatorValue,
                        position: nextNextRule?.position,
                        and: null,
                        or: null
                    };
                }
            };
            generateRule(updatedRule);
        }
        trigger = { ...trigger, rule: updatedRule };

        console.log("Seizure ", actionsNodes);
    }, [elements]);

    return (
        <div className="rules-container">
            <PageTitle title="Rules engine">
                <Button label="Save" id="saveBtn" size="sm" theme="outline-primary" title="Add" onClick={handleSave} />
            </PageTitle>
            <div className="rules-holder">
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
                            handleTriggerTextChange={handleTriggerTextChange}
                            handleRuleOperatorValueChange={handleRuleOperatorValueChange}
                            elements={elements}
                            handleEdgeChange={handleEdgeChange}
                            handleRulesDropDownChange={handleRulesDropDownChange}
                            handleDataSourceChange={handleDataSourceChange}
                            handleTriggerDropDownChange={handleTriggerDropDownChange}
                            handleTriggerStartDateChange={handleTriggerStartDateChange}
                            handleActionsPropertyDropdownChange={handleActionsPropertyDropdownChange}
                            handleActionsDropdownChange={handleActionsDropDownChange}
                            handleActionsPropertyTextChange={handleActionsPropertyTextChange}
                            handleActionsTextChange={handleActionsTextChange}
                        />
                    </ReactFlowProvider>
                </div>
            </div>
        </div>
    );
};

export default EventBody;