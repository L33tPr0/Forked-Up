import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks";

import { logout } from "../../redux/reducers/session";

type props = {
    styles: string;
};

const UserDropdown: FC<props> = ({ styles }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles}>
            <div
                className="cursor-pointer hover:bg-gray-400 p-4"
                onClick={() => dispatch(logout())}
            >
                Log out
            </div>
        </div>
    );
};

export default UserDropdown;
