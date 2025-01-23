import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    MouseEvent,
    ReactElement,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import "./index.css";
import { signIn } from "../../redux/reducers/session";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ErrorMessage from "../ErrorMessage";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";

export default function SignIn() {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();
    const user = useAppSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: ReactElement }>({});

    useEffect(() => {
        if (user) {
            navigateTo("/home");
        }
    }, [user, navigateTo]);

    function update(
        e: ChangeEvent<HTMLInputElement>,
        cb: Dispatch<SetStateAction<string>>
    ) {
        cb(e.target.value);
    }

    async function demoUserSignin(e: MouseEvent) {
        e.preventDefault();
        const payload = {
            username: "demouser",
            password: "password",
        };
        await dispatch(signIn(payload));
    }

    function handleSubmit() {
        const errors: { [key: string]: ReactElement } = {};
        const payload = isLogin
            ? {
                  username,
                  password,
              }
            : {
                  username,
                  password,
                  email,
              };
        const promise = dispatch(signIn(payload));
        promise.then(async ({ payload, type }) => {
            if ("session/signIn/rejected" === type) {
                errors.user = <ErrorMessage msg={payload.message} />;
            }
            setErrors(errors);
            setUsername("");
            setConfirmPassword("");
            setPassword("");
        });
    }

    function handleErrors(e: FormEvent) {
        e.preventDefault();
        const errors: { [key: string]: ReactElement } = {};

        if (username.length < 4)
            errors.username = (
                <ErrorMessage
                    msg={"Username must be greater than 4 characters"}
                />
            );
        if (!username)
            errors.username = <ErrorMessage msg={"Username is required"} />;

        if (password.length < 6)
            errors.password = (
                <ErrorMessage
                    msg={"Provided password must be greater than 6 characters"}
                />
            );
        if (!password)
            errors.password = <ErrorMessage msg={"Password is required"} />;
        if (!email.includes("@") && !isLogin)
            errors.email = (
                <ErrorMessage msg={"Provided email must be a valid address"} />
            );
        if (!email && !isLogin)
            errors.email = <ErrorMessage msg={"Email is required"} />;
        if (password !== confirmPassword && !isLogin)
            errors.passwordMismatch = (
                <ErrorMessage msg={"Provided passwords do not match"} />
            );
        if (!Object.values(errors).length) {
            handleSubmit();
        } else {
            setErrors(errors);
        }
    }

    return (
        <div className="signin">
            <h1>This is ForkedUp</h1>
            <h3>Your one stop app for your restaurant inventory management needs.</h3>
            <form
                className={`${isLogin ? "show" : "hide"}`}
                onSubmit={(e) => handleErrors(e)}
            >
                <h2 className="headers">Login</h2>
                {errors.user}
                <div className="login-input-container">
                    <input
                        type="text"
                        onChange={(e) => update(e, setUsername)}
                        value={username}
                        className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                        placeholder="Username"
                    />

                    <input
                        type="password"
                        onChange={(e) => update(e, setPassword)}
                        value={password}
                        className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-btn text-white"
                    title="Login"
                >
                    Login
                </button>
                <a
                    className="cursor-pointer"
                    onClick={(e) => demoUserSignin(e)}
                >
                    Sign in as Demo User
                </a>
                <div>
                    Don&apos;t have an account? Create one{" "}
                    <span className="here" onClick={function() {setIsLogin(!isLogin); setErrors({})} }>
                        here
                    </span>
                </div>
            </form>
            <form
                className={`${isLogin ? "hide" : "show"}`}
                onSubmit={(e) => handleErrors(e)}
            >
                <h2 className="headers">SignUp</h2>
                <div className="signup-input-container">
                    {errors.user}
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            placeholder="Username"
                            maxLength={16}
                            className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                            minLength={4}
                            onChange={(e) => update(e, setUsername)}
                            value={username}
                        />
                        {errors.username}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                            onChange={(e) => update(e, setEmail)}
                            value={email}
                        />
                        {errors.email}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                            maxLength={16}
                            minLength={6}
                            onChange={(e) => update(e, setPassword)}
                            value={password}
                        />
                        {errors.password}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="h-11 text-xl bg-gray-400 text-white border-none outline-none pl-2 placeholder:text-slate-600"
                            maxLength={16}
                            minLength={6}
                            onChange={(e) => update(e, setConfirmPassword)}
                            value={confirmPassword}
                        />
                        {errors.passwordMismatch}
                    </div>
                </div>
                <button type="submit" className="text-gray-200" title="Sign Up">
                    Sign Up
                </button>
                <a
                    className="light cursor-pointer text-slate-800"
                    onClick={(e) => demoUserSignin(e)}
                >
                    Sign in as Demo User
                </a>
                <div>
                    Already have an account? Log in{" "}
                    <span className="here" onClick={function() {setIsLogin(!isLogin); setErrors({})} }>
                        here
                    </span>
                </div>
            </form>
        </div>
    );
}
