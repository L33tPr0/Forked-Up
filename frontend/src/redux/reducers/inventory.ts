import { createAppAsyncThunk } from "../hooks";
import { Ingredient } from "../../types/Models";
import { createSlice } from "@reduxjs/toolkit";
import { IngredientFormData } from "../../types/FormData";

const PREFIX = "/inventory";
const ADD_ONE = `${PREFIX}/addOne`;
const DELETE_ONE = `${PREFIX}/deleteOne`;
const EDIT_ONE = `${PREFIX}/editOne`;
const READ_INVENTORY = `${PREFIX}/readInventory`;

interface InitialStateTypes {
    ingredients: Ingredient[] | [];
}

const initialState: InitialStateTypes = {
    ingredients: [],
};

export const getInventory = createAppAsyncThunk(
    READ_INVENTORY,
    async (payload: string, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch(`/api/inventories/${payload}`);

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

export const addOneIngredient = createAppAsyncThunk(
    ADD_ONE,
    async (
        { payload, id }: IngredientFormData,
        { fulfillWithValue, rejectWithValue }
    ) => {
        const res = await fetch(`/api/inventories/${id}/ingredients`, {
            method: "POST",
            body: JSON.stringify(payload!),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }
        console.log(data)
        return fulfillWithValue(data);
    }
);
export const editOneIngredient = createAppAsyncThunk(
    EDIT_ONE,
    async (
        { payload, id, ingredientId }: IngredientFormData,
        { fulfillWithValue, rejectWithValue }
    ) => {
        const res = await fetch(
            `/api/inventories/${id}/ingredients/${ingredientId}`,
            {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }
        return fulfillWithValue(data);
    }
);

export const deleteOneIngredient = createAppAsyncThunk(
    DELETE_ONE,
    async (id: number, { fulfillWithValue, rejectWithValue }) => {
        const res = await fetch(`/api/ingredients/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data);
        }

        return fulfillWithValue(data);
    }
);

const ingredientSlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addOneIngredient.fulfilled, (state, action) => {
               state.ingredients[state.ingredients.length] = action.payload
            })
            .addCase(deleteOneIngredient.fulfilled, (state, action) => {
                const index = state.ingredients.findIndex(
                    (item) => item.id === action.payload
                );

                state.ingredients.splice(index, 1);
            })
            .addCase(getInventory.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            });
    },
});

export default ingredientSlice.reducer;
