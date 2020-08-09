import React from "react";

export enum icontypesEnum {
    BARS = "BARS",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT",
    DEVICES = "DEVICES",
    ACTUATORS = "ACTUATORS"
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
        case icontypesEnum.DEVICES:
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.823 0-16-7.178-16-16V80c0-8.822 7.177-16 16-16h416m0-32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-336 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm0 96c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm288-148v-24a6 6 0 0 1-6-6H198a6 6 0 0 1-6 6v24a6 6 0 0 1 6 6h212a6 6 0 0 1 6-6zm0 96v-24a6 6 0 0 1-6-6H198a6 6 0 0 1-6 6v24a6 6 0 0 1 6 6h212a6 6 0 0 1 6-6zm0 96v-24a6 6 0 0 1-6-6H198a6 6 0 0 1-6 6v24a6 6 0 0 1 6 6h212a6 6 0 0 1 6-6z" /></svg>;
        case icontypesEnum.ACTUATORS:
            return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M506 114H134a6 6 0 0 0-6-6V84a6 6 0 0 0 6-6h372a6 6 0 0 0 6 6v24a6 6 0 0 0-6 6zm6 154v-24a6 6 0 0 1-6-6H134a6 6 0 0 1-6 6v24a6 6 0 0 1 6 6h372a6 6 0 0 1 6-6zm0 160v-24a6 6 0 0 1-6-6H134a6 6 0 0 1-6 6v24a6 6 0 0 1 6 6h372a6 6 0 0 1 6-6zM48 60c-19.882 0-36 16.118-36 36s16.118 36 36 36 36-16.118 36-36-16.118-36-36-36zm0 160c-19.882 0-36 16.118-36 36s16.118 36 36 36 36-16.118 36-36-16.118-36-36-36zm0 160c-19.882 0-36 16.118-36 36s16.118 36 36 36 36-16.118 36-36-16.118-36-36-36z" /></svg>;
        default:
            return <svg></svg>;
    }
}