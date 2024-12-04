import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../hooks";
import type { User } from "../../types/Models";

const PREFIX = "session";
const SIGN_IN = `${PREFIX}/signIn`;
const LOGOUT = `${PREFIX}/logout`;
const RESTORE_USER = `${PREFIX}/restoreUser`;

export const signIn = createAppAsyncThunk(
    SIGN_IN,
    async (credentials: User, { fulfillWithValue, rejectWithValue }) => {
        if (credentials.email) {
            const res = await fetch("/api/session/signup", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data);
            }

            return fulfillWithValue(data);
        }

        const res = await fetch("/api/session/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

export const logout = createAppAsyncThunk(LOGOUT, async () => {
    await fetch("/api/session", { method: "DELETE" });

    return;
});

export const restoreUser = createAppAsyncThunk(
    RESTORE_USER,
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch("/api/session", { credentials: "include" });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

interface SessionState {
    user: User | null;
}

const initialState: SessionState = { user: null };

const setUser = (state: SessionState, user: User | null): void => {
    state.user = user;
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout.fulfilled, (state: SessionState) => {
                setUser(state, null);
            })
            .addMatcher(
                (action) =>
                    isAnyOf(signIn.fulfilled, restoreUser.fulfilled)(action),
                (state, action: PayloadAction<User>) => {
                    setUser(state, action.payload);
                }
            );
    },
});

export default sessionSlice.reducer;
