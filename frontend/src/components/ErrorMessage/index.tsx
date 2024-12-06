import type { ReactElement } from "react";

export default function ErrorMessage({
    msg,
}: {
    msg: string;
}): ReactElement | null {
    return msg ? (
        <p className="text-lg font-bold text-red-500 m-1">{msg}</p>
    ) : null;
}
