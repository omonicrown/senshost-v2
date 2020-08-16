import React from "react";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../utils/svgElement";
import { useHistory } from "react-router";
import { History } from 'history';
import { HomeRoutes } from "../../enums/routes";

interface SidebarProps {
    onToggle: (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => void;
    toggle: boolean;
}

interface MenuItem {
    name: string;
    iconType: icontypesEnum;
    title: string;
    onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
const Sidebar: React.FunctionComponent<SidebarProps> = (props: SidebarProps): React.ReactElement<void> => {
    const history: History = useHistory();

    const activeTab: string = React.useMemo(() => {
        const historyArr = history.location?.pathname?.split("/");

        const selectedRoute: string = historyArr[historyArr.length - 1];

        return selectedRoute;
    }, [history]);


    const menuItems: Array<MenuItem> = [
        {
            name: "dashboard",
            iconType: icontypesEnum.DEVICES,
            title: "Dashboard",
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => { history.push(HomeRoutes.Dashboard?.toString()); e.preventDefault(); }

        },
        {
            name: "devices",
            iconType: icontypesEnum.DEVICES,
            title: "Devices",
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => { history.push(HomeRoutes.Devices?.toString()); e.preventDefault(); }
        },
        {
            name: "actuators",
            iconType: icontypesEnum.ACTUATORS,
            title: "Actuators",
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => { history.push(HomeRoutes.Devices?.toString()); e.preventDefault(); }
        },
        {
            name: "groups",
            iconType: icontypesEnum.GROUPS,
            title: "Groups",
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => { history.push(HomeRoutes.Groups?.toString()); e.preventDefault(); }
        },
        {
            name: "users",
            iconType: icontypesEnum.USER,
            title: "Users",
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => { history.push(HomeRoutes.Users?.toString()); e.preventDefault(); }
        },
    ];

    return (
        <aside className={"left-side-container " + (props.toggle ? "sidemenu-opened" : "sidemenu-closed")}>
            <div className="hamburger-icon">
                <Icon src={<SvgElement type={icontypesEnum.BARS} onClick={props.onToggle} />} />
            </div>
            <div className="sidebar-content">
                <div className="row">
                    <div className="sidebar-sticky col">
                        <ul className="nav d-flex flex-column">
                            {menuItems?.map((menu: MenuItem) =>
                                <li className={"nav-item" + (activeTab === menu.name ? " active" : "")} key={menu.name} onClick={menu.onClick}>
                                    <div className="title-holder d-flex ">
                                        <Icon src={<SvgElement type={menu.iconType} />} />
                                        <span className="title">{menu.title}</span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;