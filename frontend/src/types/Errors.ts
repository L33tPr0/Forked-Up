import { ReactElement } from "react";

export interface ErrorsObject {
    username: ReactElement | "";
    password: ReactElement | "";
    email: ReactElement | "";
    passwordMismatch: ReactElement | "";
}
