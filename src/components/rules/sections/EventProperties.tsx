import React from "react";
import { FlowElement, Edge } from "react-flow-renderer";

import EngineForm from "../forms/Engine";
import LineForm from "../forms/Line";
import RuleForm from "../forms/Rules";

interface EventPropertiesProps {
    element: FlowElement & Edge;
}
const EventProperties: React.FC<EventPropertiesProps> = (props: EventPropertiesProps): React.ReactElement<void> => {
    const isRuleEdge: boolean = React.useMemo(() => {
        const firstWord: string = props.element?.target?.split("-")[0];
        return (
            firstWord === "string" ||
            firstWord === "time" ||
            firstWord === "number"
        )
    }, [props.element]);

    const isEngineNode = React.useMemo(() => {
        const firstWord: string = props.element?.id?.split("-")[0];
        return (
            firstWord === "engine"
        )
    }, [props.element]);

    const isRuleNode = React.useMemo(() => {
        const firstWord: string = props.element?.id?.split("-")[0];
        return (
            firstWord === "string" ||
            firstWord === "number" ||
            firstWord === "time"
        )
    }, [props.element]);

    return (
        <aside className="properties-holder">
            <div className="description">properties</div>
            {isEngineNode && <EngineForm loading={false} />}
            {isRuleEdge && <LineForm loading={false} />}
            {isRuleNode && <RuleForm loading={false} />}
        </aside>
    );
};

export default EventProperties;
