import React from "react";
import { Image } from "@sebgroup/react-components/dist/Image";
import { AppRoutes } from "../../enums/routes";
import { SharedProps } from "../home/Home";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../utils/svgElement";

interface HeaderProps extends SharedProps {
    onToggle: (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => void;
    toggle: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps): React.ReactElement<void> => {

    return (
        <div className="header-container d-flex">

            <Icon src={<SvgElement type={icontypesEnum.BARS} onClick={props.onToggle} />} />

            <Image
                src={require("../../assets/images/logo-inner.png")}
                useImgTag={true}
                width="150px"
                height="60px"
                onClick={() => {
                    props?.history?.push(AppRoutes.Home.toString());
                }}
            />
        </div>
    )
}

export default Header;