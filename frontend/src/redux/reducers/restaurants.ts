import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../hooks";
import { Restaurant } from "../../types/Models";
import { RestaurantFormData } from "../../types/FormData";

const PREFIX = "restaurants";
const GET_ALL = `${PREFIX}/readAll`;
const SELL_ONE = `${PREFIX}/sellOne`;
const BUY_ONE = `${PREFIX}/buyOne`;
const DELETE_ONE = `${PREFIX}/delete`;
const ADD_ONE = `${PREFIX}/createOne`;

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
export const sellRestaurant = createAppAsyncThunk(
    SELL_ONE,
    async (payload: number, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch(`/api/restaurants/${payload}/sell`, {
            method: "PUT",
            body: JSON.stringify({}),
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

export const buyRestaurant = createAppAsyncThunk(
    BUY_ONE,
    async (id: number, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch(`/api/restaurants/${id}/buy`, {
            method: "PUT",
            body: JSON.stringify({}),
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

export const deleteRestaurant = createAppAsyncThunk(
    DELETE_ONE,
    async (id: number, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch(`/api/restaurants/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

export const addRestaurant = createAppAsyncThunk(
    ADD_ONE,
    async (
        payload: RestaurantFormData,
        { fulfillWithValue, rejectWithValue }
    ) => {
        const res = await fetch(`/api/restaurants`, {
            method: "POST",
            body: JSON.stringify(payload),
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

export interface InitialStateTypes {
    owned: Restaurant[] | [];
    forSale: Restaurant[] | [];
}

const initialState: InitialStateTypes = {
    owned: [],
    forSale: [],
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                getRestaurants.fulfilled,
                (state: InitialStateTypes, action) => {
                    const restaurants = action.payload as Restaurant[];

                    state.owned = restaurants.filter(
                        (rest) => rest.is_for_sale === false
                    );
                    state.forSale = restaurants.filter(
                        (rest) => rest.is_for_sale !== false
                    );
                }
            )
            .addCase(
                sellRestaurant.fulfilled,
                (state: InitialStateTypes, action) => {
                    const restaurant = action.payload as Restaurant;
                    const index = state.owned.findIndex(
                        (val) => val.id === restaurant.id
                    );
                    state.owned.splice(index, 1);
                    state.forSale[state.forSale.length] = restaurant;
                }
            )
            .addCase(
                buyRestaurant.fulfilled,
                (state: InitialStateTypes, action) => {
                    const restaurant = action.payload as Restaurant;
                    const index = state.forSale.findIndex(
                        (val) => val.id === restaurant.id
                    );
                    state.forSale.splice(index, 1);
                    state.owned[state.owned.length] = restaurant;
                }
            )
            .addCase(
                deleteRestaurant.fulfilled,
                (state: InitialStateTypes, action) => {
                    const index = state.owned.findIndex(
                        (rest) => rest.id === action.payload
                    );

                    state.owned.splice(index, 1);
                }
            )
            .addCase(
                addRestaurant.fulfilled,
                (state: InitialStateTypes, action) => {
                    const restaurant = action.payload;
                    state.owned[state.owned.length] = restaurant;
                }
            );
    },
});

export default restaurantSlice.reducer;
