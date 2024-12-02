import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../hooks";
import { Restaurant } from "../../types/Models";

const PREFIX = "restaurants";
const GET_ALL = `${PREFIX}/readAll`;

export const getRestaurants = createAppAsyncThunk(
    GET_ALL,
    async (_, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch("/api/restaurants");

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

export interface InitialStateTypes {
    restaurants: Restaurant[] | [];
}

const initialState: InitialStateTypes = { restaurants: [] };

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getRestaurants.fulfilled,
            (state: InitialStateTypes, action) => {
                const restaurants = action.payload as Restaurant[];

                state.restaurants = restaurants;
            }
        );
    },
});

export default restaurantSlice.reducer;
