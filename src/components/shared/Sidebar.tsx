import React from "react";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../utils/svgElement";

interface SidebarProps {
    onToggle: (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => void;
    toggle: boolean;
    activeTab: string;
}

const Sidebar: React.FunctionComponent<SidebarProps> = (props: SidebarProps): React.ReactElement<void> => {
    return (
        <aside className={"left-side-container " + (props.toggle ? "sidemenu-opened" : "sidemenu-closed")}>
            <div className="hamburger-icon">
                <Icon src={<SvgElement type={icontypesEnum.BARS} onClick={props.onToggle} />} />
            </div>
            <div className="sidebar-content">
                <div className="row">
                    <div className="sidebar-sticky col">
                        <ul className="nav d-flex flex-column">
                            <li className={"nav-item" + (props.activeTab === "devices" ? " active" : "")}>
                                <div className="title-holder d-flex ">
                                    <Icon src={<SvgElement type={icontypesEnum.DEVICES} />} />
                                    <span className="title">Devices</span>
                                </div>
                            </li>
                            <li className="nav-item d-flex">
                                <div className="title-holder d-flex ">
                                    <Icon src={<SvgElement type={icontypesEnum.ACTUATORS} />} />
                                    <span className="title">Actuators</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;