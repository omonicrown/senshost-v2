import React from "react";

export enum icontypesEnum {
    BARS = "BARS"
}

interface SvgElementProps {
    type: icontypesEnum;
    onClick: (e: React.MouseEvent<SVGElement>) => void;
}


export const SvgElement: React.FunctionComponent<SvgElementProps> = (props: SvgElementProps): React.ReactElement<void> => {
    switch(props.type) {
        case icontypesEnum.BARS: 
            return <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M442 114H6a6 6 0 0 0-6-6V84a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6zm0 160H6a6 6 0 0 0-6-6v-24a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6zm0 160H6a6 6 0 0 0-6-6v-24a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6z"/></svg>;
        default:
            return <svg></svg>;
    }
}