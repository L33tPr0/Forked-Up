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
                for (const error in payload.errors) {
                    errors[error] = (
                        <ErrorMessage msg={payload.errors[error]} />
                    );
                }
                setErrors(errors);
            }
        });
    }

    function handleErrors(e: FormEvent) {
        e.preventDefault();
        const errors: { [key: string]: ReactElement } = {};

        if (username.length < 4)
            errors.username = (
                <div className="text-red-400">
                    Provided username must be more than 4 characters
                </div>
            );
        if (!username)
            errors.username = (
                <div className="text-red-400">Username is required</div>
            );

        if (password.length < 6)
            errors.password = (
                <div className="text-red-400">
                    Provided password must be more than 6 characters
                </div>
            );
        if (!password)
            errors.password = (
                <div className="text-red-400">Password is required</div>
            );
        if (!email.includes("@") && !isLogin)
            errors.email = (
                <div className="text-red-400">Provided email must be valid</div>
            );
        if (!email && !isLogin)
            errors.email = (
                <div className="text-red-400">Email is required</div>
            );
        if (password !== confirmPassword && !isLogin)
            errors.passwordMismatch = (
                <div>Provided passwords are not the same</div>
            );
        if (!Object.values(errors).length) {
            handleSubmit();
        } else {
            setErrors(errors);
        }
    }

    function checkUsername() {}

    return (
        <div className="signin">
            <form
                className={`${isLogin ? "show" : "hide"}`}
                onSubmit={(e) => handleErrors(e)}
            >
                <h2 className="headers">Login</h2>
                <div className="login-input-container">
                    <input
                        type="text"
                        onChange={(e) => update(e, setUsername)}
                        value={username}
                        placeholder="Username"
                        onBlur={checkUsername}
                    />

                    <input
                        type="password"
                        onChange={(e) => update(e, setPassword)}
                        value={password}
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
                    <span className="here" onClick={() => setIsLogin(!isLogin)}>
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
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => update(e, setUsername)}
                        value={username}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => update(e, setEmail)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => update(e, setPassword)}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => update(e, setConfirmPassword)}
                        value={confirmPassword}
                    />
                </div>
                <button type="submit" className="submit-btn" title="Sign Up">
                    Sign Up
                </button>
                <a
                    className="light cursor-pointer text-slate-400"
                    onClick={(e) => demoUserSignin(e)}
                >
                    Sign in as Demo User
                </a>
                <div>
                    Already have an account? Log in{" "}
                    <span className="here" onClick={() => setIsLogin(!isLogin)}>
                        here
                    </span>
                </div>
            </form>
        </div>
    );
}
