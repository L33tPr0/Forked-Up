import type { Ingredient, Restaurant, Inventory } from "./Models.ts";

export type ErrorResponse = { errors: { [key: string]: string } };
export type APIResponse<T> = T | ErrorResponse;
export type LabelCollection = { inventories: Inventory[] };
export type NoteCollection = { restaurants: Restaurant[] };
export type BoardCollection = { ingredients: Ingredient[] };

export interface SuccessResponse {
    message: string;
}
