import React from "react";
import { TextBoxGroup } from "@sebgroup/react-components/dist/TextBoxGroup";
import { Button } from "@sebgroup/react-components/dist/Button";
import { UserModel, GroupModel } from "../../../../interfaces/models";
import { Dropdown, DropdownItem } from "@sebgroup/react-components/dist/Dropdown/Dropdown";

interface AddAndEditUserProps {
    groups: Array<GroupModel>;
    onSave: (e: React.FormEvent<HTMLFormElement>, group: UserModel) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const AddAndEditUser: React.FunctionComponent<AddAndEditUserProps> = (props: AddAndEditUserProps): React.ReactElement<void> => {
    const [user, setUser] = React.useState<UserModel>({ name: "", email:"", password: "" } as UserModel);
    const [userError, setUserError] = React.useState<UserModel>({ name: "", email:"", password: "" } as UserModel);

    const [selectedGroup, setSelectedGroup] = React.useState<DropdownItem>({} as DropdownItem);

    const groupOptions: Array<DropdownItem> = React.useMemo(() => props?.groups?.map((group: GroupModel) => ({ label: group.name, value: group.id })), [props?.groups])

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }, [user]);

    const onCancel = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUser({ name: "" } as UserModel);
        props.onCancel(e);
    }, [user]);


    const onSave = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        if (!user?.name) {
            setUserError({ ...userError, name: "Username name is required" } as UserModel);
        } else {
            props?.onSave(e, user);
        }

        e.preventDefault();
    }, [user]);

    React.useEffect(() => {
        setUser({ ...user, groupId: selectedGroup?.value });
    }, [selectedGroup, setUser]);

    return (
        <form className="add-and-edit-group" onSubmit={onSave}>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <Dropdown
                        label="Group"
                        list={groupOptions}
                        selectedValue={selectedGroup}
                        onChange={(value: DropdownItem) => setSelectedGroup(value)}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        value={user?.email}
                        error={userError?.email}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="name"
                        label="username"
                        placeholder="username"
                        value={user?.name}
                        error={userError?.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <TextBoxGroup
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={user?.password}
                        error={userError?.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row controls-holder">
                <div className="col-12 col-sm-6">
                    <Button label="Cancel" size="sm" theme="outline-primary" onClick={onCancel} />
                </div>
                <div className="col-12 col-sm-6 text-right">
                    <Button label="Save" type="submit" size="sm" theme="primary" title="Save" onClick={null} />
                </div>
            </div>

        </form>
    );
};

export default AddAndEditUser;