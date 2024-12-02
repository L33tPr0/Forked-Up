import type { ReactElement } from "react";

export default function ErrorMessage({
    msg,
}: {
    msg: string;
}): ReactElement | null {
    return msg ? <span className="error-message">{msg}</span> : null;
}
