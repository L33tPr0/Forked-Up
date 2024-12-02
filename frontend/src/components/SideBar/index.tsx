import { IoIosMenu } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setIsSidebarCollapsed } from "../../redux/reducers/global";
import { IconType } from "react-icons";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoRestaurantOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { MouseEventHandler } from "react";

interface SidebarLinkProps {
    href: string;
    icon: IconType;
    label: string;
    isCollapsed: boolean;
    onClick?: MouseEventHandler;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,
    onClick,
}: SidebarLinkProps) => {
    const location = useLocation().pathname;
    const isActive =
        location === href || (location === "/" && href === "/home");

    return (
        <Link to={href} onClick={onClick}>
            <div
                className={`cursor-pointer flex items-center ${
                    isCollapsed
                        ? "justify-center py-4"
                        : "justify-start px-8 py-4"
                } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
                    isActive ? "bg-blue-200 text-white" : ""
                }`}
            >
                <Icon className={`w-6 h-6 !text-gray-700`} />
                <span
                    className={`${
                        isCollapsed ? "hidden" : "block"
                    } font-medium text-gray-700`}
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default function SideBar() {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const sidebarClassNames = `fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

    function toggleSidebar() {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }

    return (
        <div className={sidebarClassNames}>
            {/* TOP LOGO */}

            <div
                className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
                    isSidebarCollapsed ? "px-5" : "px-8"
                }`}
            >
                <div>logo</div>
                <h1
                    className={`font-extrabold text-2xl ${
                        isSidebarCollapsed ? "hidden" : "block"
                    }`}
                >
                    FORKEDUP
                </h1>
                <button
                    className={`md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer`}
                    onClick={toggleSidebar}
                >
                    <IoIosMenu className="w-4 h-4" />
                </button>
            </div>

            {/* NAV LINKS */}
            <div className={`flex-grow mt-8`}>
                <SidebarLink
                    href="/home"
                    icon={IoHomeOutline}
                    label="Home"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/restaurants"
                    icon={IoRestaurantOutline}
                    label="Restaurants"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/employees"
                    icon={PiUsers}
                    label="Employees"
                    isCollapsed={isSidebarCollapsed}
                    onClick={(e) => {
                        e.preventDefault();
                        alert("Feature coming soon.");
                    }}
                />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className={`text-center text-xs text-gray-500`}>
                    &copy; 2024 ForkedUp
                </p>
            </div>
        </div>
    );
}
