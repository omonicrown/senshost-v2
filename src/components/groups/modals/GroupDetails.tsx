import React from "react";
import { UserApis } from "../../../apis/userApis";
import { AxiosResponse, AxiosError } from "axios";
import { GroupModel, UserModel } from "../../../interfaces/models";
import { Column, Table } from "@sebgroup/react-components/dist/Table/Table";
import { Button } from "@sebgroup/react-components/dist/Button";

interface GroupDetailsProps {
    group: GroupModel;
    toggle: boolean;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const GroupDetails: React.FunctionComponent<GroupDetailsProps> = (props: GroupDetailsProps): React.ReactElement<void> => {
    const [users, setUsers] = React.useState<Array<UserModel>>(null);

    const columns: Array<Column> = React.useMemo((): Array<Column> => [
        {
            label: "Username",
            accessor: "name"
        },
        {
            label: "Email",
            accessor: "email",
            isHidden: false
        },
        {
            label: "date",
            accessor: "creationDate"
        }
    ], []);

    React.useEffect(() => {
        if (props?.toggle) {
            UserApis?.getUsersByGroupId(props.group?.id)
                .then((response: AxiosResponse<Array<UserModel>>) => {
                    if (response?.data) {
                        setUsers(response.data);
                    }
                })
                .catch((error: AxiosError) => setUsers([]));
        }
    }, [props?.toggle]);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <Table
                        columns={columns}
                        data={users}
                    />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-end controls-holder">
                <Button label="Close" type="button" size="sm" theme="primary" title="Close" onClick={props.onCancel} />
            </div>
        </React.Fragment>
    )

};

export default GroupDetails;