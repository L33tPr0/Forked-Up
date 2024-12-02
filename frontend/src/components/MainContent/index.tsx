import { IoIosMenu } from "react-icons/io";
import { FC } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import UserDropdown from "./UserDropdown";
import { CgProfile } from "react-icons/cg";
// import { Link } from "react-router-dom";
// import { IoSettingsOutline } from "react-icons/io5";

import {
    setIsDarkMode,
    setIsSidebarCollapsed,
    setIsUserDropdownOpen,
} from "../../redux/reducers/global";
import { getRestaurants } from "../../redux/reducers/restaurants";

const MainContent: FC = () => {
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();
    const location = useLocation();
    const user = useAppSelector((state: RootState) => state.session.user);
    const restaurants = useAppSelector(
        (state: RootState) => state.restaurants.restaurants
    );
    const isSidebarCollapsed: boolean = useAppSelector(
        (state: RootState) => state.global.isSidebarCollapsed
    );
    const isUserDropdownOpen: boolean = useAppSelector(
        (state: RootState) => state.global.isUserDropdownOpen
    );
    const isDarkMode: boolean = useAppSelector(
        (state) => state.global.isDarkMode
    );

    function toggleTheme() {
        dispatch(setIsDarkMode(!isDarkMode));
    }

    function toggleSidebar() {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    }

    function toggleUserDropdown() {
        dispatch(setIsUserDropdownOpen(!isUserDropdownOpen));
    }

    useEffect(() => {
        if (!user) {
            navigateTo("/");
        }
    }, [user, navigateTo]);

    useEffect(() => {
        if (location.pathname === "/restaurants") {
            dispatch(getRestaurants());
        }
    }, [dispatch, location.pathname]);

    return (
        <div
            className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
                isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
            }`}
        >
            <nav className={`flex justify-between items-center w-full mb-7`}>
                {/* LEFT SIDE */}
                <div className={`flex justify-between items-center gap-5`}>
                    <button
                        className={`px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100`}
                        onClick={toggleSidebar}
                    >
                        <IoIosMenu className={`w-4 h-4`} />
                    </button>
                    <div className={`relative`}>
                        <input
                            type="search"
                            placeholder="Start typing to search ingredients & menu items"
                            className={`pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-gray-500`}
                        />
                        <div
                            className={`absolute inset-y-0 left-0 pl-3 flex items-center`}
                        >
                            <FaMagnifyingGlass
                                className="pointer-events-none text-gray-500"
                                size={20}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}

                <div className={`flex justify-between items-center gap-5`}>
                    <div className="hidden md:flex justify-between items-center gap-5">
                        <div>
                            <button onClick={toggleTheme}>
                                {isDarkMode ? (
                                    <LuSun
                                        className={`text-gray-500`}
                                        size={24}
                                    />
                                ) : (
                                    <LuMoon
                                        className={`text-gray-500`}
                                        size={24}
                                    />
                                )}
                            </button>
                        </div>
                        <hr
                            className={`w-0 h-7 border border-solid border-l border-gray-300 mx-3`}
                        />
                        <div
                            className={
                                "flex items-center gap-3 cursor-pointer relative"
                            }
                            onClick={toggleUserDropdown}
                        >
                            <CgProfile size={24} />
                            <span className={`font-semibold`}>
                                {user?.username}
                            </span>
                            {isUserDropdownOpen ? (
                                <UserDropdown
                                    styles={`border-gray-500 absolute bg-gray-200 left-0 top-[40px]`}
                                />
                            ) : null}
                        </div>
                    </div>
                    {/* <Link to="/settings">
                        <IoSettingsOutline
                            className={`cursor-pointer text-gray-500`}
                            size={24}
                        />
                    </Link> */}
                </div>
            </nav>

            {/* BODY CONTENT */}
            {location.pathname === "/home" ? (
                <main className="">The main content</main>
            ) : location.pathname === "/restaurants" ? (
                <div>
                    <div
                        className={`grid w-full h-full bg-slate-100 rounded-2xl grid-cols-4 grid-rows-${
                            restaurants.length + 2
                        }`}
                    >
                        <h2 className="text-2xl text-gray-900 m-3">
                            Restaurants
                        </h2>
                        <h2 className="text-2xl text-gray-900 m-3">
                            Carry Out
                        </h2>
                        <h2 className="text-2xl text-gray-900 m-3">
                            Carry Out
                        </h2>
                        <h2 className="text-2xl text-gray-900 border-b-1 m-3">
                            For Sale
                        </h2>
                        {restaurants.map((restaurant) => (
                            <div key={restaurant.id} className="">
                                <div className="">
                                    <div className="text-gray-900">
                                        {restaurant.name}
                                    </div>
                                    <div className="text-gray-900">
                                        {restaurant.has_carryout
                                            ? "This restaurant has carryout"
                                            : "This restaurant does not have carryout"}
                                    </div>
                                    <div className="text-gray-900"></div>
                                    <div className="text-gray-900"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MainContent;
