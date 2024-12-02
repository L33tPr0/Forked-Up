import { FC, MouseEvent } from "react";
import { useAppDispatch } from "../../redux/hooks";

import { logout } from "../../redux/reducers/session";

type props = {
    styles: string;
};

const UserDropdown: FC<props> = ({ styles }) => {
    const dispatch = useAppDispatch();

    async function handleLogout(e: MouseEvent<HTMLDivElement>) {
        e.currentTarget.innerText = "Really Sign Out?";
        e.currentTarget.addEventListener("click", async () => {
            await dispatch(logout());
        });
    }

    return (
        <div className={styles}>
            <div
                className="cursor-pointer hover:bg-gray-400 p-4"
                onClick={handleLogout}
            >
                Log out
            </div>
        </div>
    );
};

export default UserDropdown;
