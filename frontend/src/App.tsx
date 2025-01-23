import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { restoreUser } from "./redux/reducers/session";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import type { User } from "./types/Models";
import SignIn from "./components/SignIn";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";
import { RootState } from "./redux/store";

function App() {
    const dispatch = useAppDispatch();
    const isDarkMode: boolean = useAppSelector(
        (state: RootState) => state.global.isDarkMode
    );
    function Layout() {
        const navigateTo = useNavigate();
        const user: User | null = useAppSelector((state) => state.session.user);

        useEffect(() => {
            if (user) return;

            dispatch(restoreUser()).then((action) => {
                if (action.type === "session/restoreUser/rejected") {
                    navigateTo("/");
                    return;
                }
            });
        }, [navigateTo, user]);

        return <Outlet />;
    }

    const router = createBrowserRouter([
        {
            element: (
                <>
                    <Layout />
                </>
            ),
            path: "/",
            children: [
                {
                    index: true,
                    element: (
                        <>
                        <h1>This is ForkedUp</h1>
                        <h3>Your one stop app for all your inventory management needs.</h3>
                        <img src="/banquet.jpeg" alt="" />
                        <div className="light h-full bg-gray-300 -z-30 grid place-items-center">
                            <SignIn />
                        </div>
                        </>
                    ),
                },
                {
                    path: "home",
                    element: (
                        <div
                            className={`${
                                isDarkMode ? "dark" : "light"
                            } flex bg-gray-50 text-gray-900 w-full h-full min-h-screen overflow-hidden`}
                        >
                            <SideBar />
                            <MainContent />
                        </div>
                    ),
                },
                {
                    path: "restaurants",
                    element: (
                        <div
                            className={`${
                                isDarkMode ? "dark" : "light"
                            } flex bg-gray-50 text-gray-900 w-full h-full min-h-screen overflow-hidden`}
                        >
                            <SideBar />
                            <MainContent />
                        </div>
                    ),
                },
                {
                    path: "restaurants/:id",
                    element: (
                        <div
                            className={`${
                                isDarkMode ? "dark" : "light"
                            } flex bg-gray-50 text-gray-900 w-full h-full min-h-screen overflow-hidden`}
                        >
                            <SideBar />
                            <MainContent />
                        </div>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
