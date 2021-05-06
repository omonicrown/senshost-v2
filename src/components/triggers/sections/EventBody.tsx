import { Button } from "@sebgroup/react-components/dist/Button";
import { DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";
import { AxiosResponse } from "axios";
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
import { TriggerApis } from "../../../apis/triggerApis";
import { RuleDataSouceTypeEnums, RuleTriggerTypes, RuleTypeEnums, TriggerDataSourceTypeEnums } from "../../../enums";
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

    const [loading, setLoading] = React.useState<boolean>(false);
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

    const getNodeLabel = (ruleType: RuleActionTypes | RuleTypes | TriggerTypes): string => {
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

        const newNode = {
            id: `${ruleType}-${getId()}`,
            type,
            position,
            style: { backgroundColor: nodeCategory === "trigger" && "#eee" },
            data: {
                label: getNodeLabel(ruleType),
                nodeType: nodeCategory,
                nodeControls: {
                    trigger: {
                        eventName: "",
                        triggerName: ""
                    },
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

        const actions: Array<ActionModel> = actionsNodes?.map((action: FlowElement) => {
            if (action?.data?.nodeControls?.actions?.newAction) {
                return {
                    id: null,
                    name: action?.data?.nodeControls?.actions?.newAction?.name,
                    type: action?.data?.nodeControls?.actions?.newAction?.actionType?.value,
                    properties: JSON.stringify(action?.data?.nodeControls?.actions?.newAction?.property || ""),
                    accountId: authState?.auth?.account?.id,
                    creationDate: null
                } as ActionModel;
            }
            return action?.data?.nodeControls?.actions?.action
        });

        const ruleType: string = selectedTrigger?.id?.split("-")[0];
        let trigger: TriggerModel = {
            id: null,
            name: selectedTrigger?.data?.nodeControls?.trigger?.eventName,
            eventName: selectedTrigger?.data?.nodeControls?.trigger?.triggerName,
            type: RuleTriggerTypes[ruleType],
            sourceType: selectedTrigger?.data?.nodeControls?.trigger?.sourceType?.value || selectedTrigger?.data?.nodeControls?.trigger?.sourceType,
            sourceId: selectedTrigger?.data?.nodeControls?.trigger?.sourceId?.value || selectedTrigger?.data?.nodeControls?.trigger?.sourceId,
            accountId: authState?.auth?.account?.id,
            deviceId: selectedTrigger?.data?.nodeControls?.trigger?.deviceId?.value || selectedTrigger?.data?.nodeControls?.trigger?.deviceId,
            rule: null,
            actions
        };
        const firstRuleNode: Node = getOutgoers(selectedTrigger as Node, elements)[0];
        let updatedRule: RuleModel;
        const edges: Array<Edge> = getConnectedEdges(rulesNodes as Array<Node>, edgesNodes);

        for (let rule of rulesNodes) {
            const generateRule = (recursiveRuleRule?: RuleModel) => {
                const nextNextRule: Node = getOutgoers(rule as Node, elements)[0];
                const selectedEdge: Edge = edges?.find((edge: Edge) => edge?.target === rule?.id);
                const firstWord: string = updatedRule ? nextNextRule?.id.split("-")[0] : firstRuleNode?.id.split("-")[0]
                if (recursiveRuleRule?.and || recursiveRuleRule?.or) {
                    if (recursiveRuleRule?.and) {
                        generateRule(recursiveRuleRule?.and);
                    } else {
                        generateRule(recursiveRuleRule?.or);
                    }
                } else if (!updatedRule) {
                    const nodeDatasourceType: keyof typeof RuleDataSouceTypeEnums = firstRuleNode?.data.nodeControls.rules.type
                    updatedRule = {
                        title: firstRuleNode?.data.nodeControls.rules?.title,
                        fieldId: firstRuleNode?.data.nodeControls.rules.sensor?.value || firstRuleNode?.data.nodeControls.rules.sensor,
                        deviceId: firstRuleNode?.data.nodeControls.rules.device?.value || firstRuleNode?.data.nodeControls.rules.device,
                        operator: firstRuleNode?.data.nodeControls.rules.operator?.value || firstRuleNode?.data.nodeControls.rules.operator,
                        ruleType: RuleTypeEnums[firstWord],
                        dataFieldSourceType: RuleDataSouceTypeEnums[nodeDatasourceType],
                        value: firstRuleNode?.data.nodeControls.rules?.operatorValue,
                        position: firstRuleNode?.position,
                        and: null,
                        or: null
                    } as RuleModel;
                } else {
                    const firstWordDefault: string = rule?.id.split("-")[0];
                    const nodeDatasourceType: keyof typeof RuleDataSouceTypeEnums = rule?.data.nodeControls.rules.type
                    recursiveRuleRule[`${selectedEdge?.label === 'OR' ? 'or' : 'and'}`] = {
                        title: rule?.data.nodeControls.rules?.title,
                        fieldId: rule?.data.nodeControls.rules.sensor?.value || rule?.data.nodeControls.rules.sensor,
                        deviceId: rule?.data.nodeControls.rules.device?.value || rule?.data.nodeControls.rules.device,
                        operator: rule?.data.nodeControls.rules.operator?.value || rule?.data.nodeControls.rules.operator,
                        ruleType: RuleTypeEnums[firstWordDefault],
                        dataFieldSourceType: RuleDataSouceTypeEnums[nodeDatasourceType],
                        value: rule?.data.nodeControls.rules?.operatorValue,
                        position: (rule as Node)?.position,
                        and: null,
                        or: null
                    };
                }
            };
            generateRule(updatedRule);
        }
        trigger = { ...trigger, rule: updatedRule };

        setLoading(true);
        TriggerApis.createTrigger(trigger)
            .then((response: AxiosResponse<TriggerModel>) => {

            }).finally(() => {
                setLoading(false);
            });

        console.log("Seizure ", trigger);
    }, [elements]);

    React.useEffect(() => {
        const response = {
            "id": null,
            "name": "Event name",
            "eventName": "trigger name",
            "type": 0,
            "sourceType": 0,
            "accountId": "a4c91ef7-8feb-42a9-96f5-b13fca3c22dc",
            "deviceId": "b95b4539-b2fe-465a-abd0-91d0696dfe6b",
            "position": {
                "x": 144.24062499764864,
                "y": 171.0884724164569
            },
            "rule": {
                "title": "String rule",
                "fieldId": "638063a5-121f-47d7-8f8f-205e66841f05",
                "deviceId": "b95b4539-b2fe-465a-abd0-91d0696dfe6b",
                "operator": "startWith",
                "ruleType": 1,
                "dataFieldSourceType": 0,
                "value": "fff",
                "position": {
                    "x": 144.24062499764864,
                    "y": 171.0884724164569
                },
                "and": {
                    "title": "Time rule",
                    "fieldId": "638063a5-121f-47d7-8f8f-205e66841f05",
                    "deviceId": "b95b4539-b2fe-465a-abd0-91d0696dfe6b",
                    "operator": "<=",
                    "ruleType": 0,
                    "dataFieldSourceType": 0,
                    "value": "rrr",
                    "position": {
                        "x": 89.33082293910957,
                        "y": 305.17054721056394
                    },
                    "and": null,
                    "or": {
                        "title": "Number rule",
                        "fieldId": "638063a5-121f-47d7-8f8f-205e66841f05",
                        "deviceId": "b95b4539-b2fe-465a-abd0-91d0696dfe6b",
                        "operator": "<=",
                        "ruleType": 2,
                        "dataFieldSourceType": 0,
                        "value": "444",
                        "position": {
                            "x": 57.406519416703134,
                            "y": 430.3138170183972
                        },
                        "and": null,
                        "or": null
                    }
                },
                "or": null
            },
            "actions": []
        };

        const newNode = {
            id: `${ruleType}-${getId()}`,
            type: "input",
            position: response?.position,
            style: { backgroundColor: "#eee" },
            data: {
                label: getNodeLabel(type, ruleType),
                nodeType: nodeCategory,
                nodeControls: {
                    trigger: {
                        eventName: response?.eventName,
                        triggerName: response?.name
                    },
                    rules: {},
                    actions: {},
                }
            },
        };

        setElements((es) => es.concat(newNode));

    }, [])

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
                            loading={loading}
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