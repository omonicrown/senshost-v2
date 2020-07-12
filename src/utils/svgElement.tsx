import React from "react";

export enum icontypesEnum {
    BARS = "BARS",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
}

interface SvgElementProps {
    type: icontypesEnum;
    onClick?: (e: React.MouseEvent<SVGElement>) => void;
}


export const SvgElement: React.FunctionComponent<SvgElementProps> = (props: SvgElementProps): React.ReactElement<void> => {
    switch (props.type) {
        case icontypesEnum.BARS:
            return <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M442 114H6a6 6 0 0 0-6-6V84a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6zm0 160H6a6 6 0 0 0-6-6v-24a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6zm0 160H6a6 6 0 0 0-6-6v-24a6 6 0 0 0 6-6h436a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6z" /></svg>;
        case icontypesEnum.PREVIOUS:
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z" /></svg>;
        case icontypesEnum.NEXT:
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z" /></svg>;
        default:
            return <svg></svg>;
    }
}