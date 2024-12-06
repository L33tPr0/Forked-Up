import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import sessionReducer from "./reducers/session";
import globalReducer from "./reducers/global";
import restaurantReducer from "./reducers/restaurants";
import inventoryReducer from "./reducers/inventory";

const logger = import.meta.env.MODE !== "production" ? createLogger() : null;

export const store = configureStore({
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        logger ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
    reducer: {
        session: sessionReducer,
        global: globalReducer,
        restaurants: restaurantReducer,
        inventory: inventoryReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
