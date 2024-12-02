import { useEffect, useState } from "react";
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
        const [isLoaded, setIsLoaded] = useState(false);
        const navigateTo = useNavigate();
        const user: User | null = useAppSelector((state) => state.session.user);

        useEffect(() => {
            if (!user) navigateTo("/");
        }, [user, navigateTo]);

        useEffect(() => {
            dispatch(restoreUser()).then(() => {
                setIsLoaded(true);
            });
        }, []);

        return isLoaded ? <Outlet /> : null;
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
                    element: <SignIn />,
                },
                {
                    path: "home",
                    element: (
                        <div
                            className={`${
                                isDarkMode ? "dark" : "light"
                            } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
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
                            } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
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
