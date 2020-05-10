import React from "react";
import { Image } from "@sebgroup/react-components/dist/Image";
import { AppRoutes } from "../../enums/routes";
import { SharedProps } from "../home/Home";

interface HeaderProps extends SharedProps {

}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps): React.ReactElement<void> => {
    return (
        <div className="header-container">
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