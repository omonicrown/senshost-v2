import React, { useReducer } from "react";
import { Image } from "@sebgroup/react-components/dist/Image";
import { AppRoutes } from "../../enums/routes";
import { SharedProps } from "../home/Home";
import { Icon } from "@sebgroup/react-components/dist/Icon";
import { SvgElement, icontypesEnum } from "../../utils/svgElement";
import { Button } from "@sebgroup/react-components/dist/Button";
import { States } from "../../interfaces/states";
import { Link, useHistory } from "react-router-dom";
import { History } from "history";

import authReducer from "../../reducers/authReducer";
import { SIGNOUT_USER } from "../../constants";

interface HeaderProps extends SharedProps {
    onToggle: (e: React.MouseEvent<SVGElement, MouseEvent>, value?: boolean) => void;
    toggle: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps): React.ReactElement<void> => {
    const history: History = useHistory();

    const [toggle, setToggle] = React.useState<boolean>(false);
    const [authState, dispatch] = useReducer(authReducer, {
        isFetching: false,
        auth: null,
        error: null,
        isAuthenticated: false
    });

    const onSignOut = React.useCallback((e?: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch({ type: SIGNOUT_USER });
    }, []);

    React.useEffect(() => {
        if (!authState?.auth?.identityToken) {
            history.replace(AppRoutes.Account);
        }
    }, [authState?.auth])

    return (
        <div className="header-container d-flex">
            <div className="logo-holder">
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


            <div className={'user-menu' + (toggle ? ' expanded' : '')}>
                <Button
                    label={`${authState?.auth?.account?.name}`}
                    onClick={(e?: React.MouseEvent<HTMLButtonElement>) => setToggle(!toggle)}
                    icon={toggle ? <SvgElement type={icontypesEnum.ANGLE_UP} /> : <SvgElement type={icontypesEnum.ANGLE_DOWN} />}
                    iconPosition='right'
                    theme='link'
                />
                <div className='user-menu-list'>
                    <Link
                        to='#'
                        className={'user-menu-list-item'}
                        onClick={onSignOut}
                    >
                        Sign Out
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Header;