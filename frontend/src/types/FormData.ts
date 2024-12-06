import { Ingredient } from "./Models";

export interface RestaurantFormData {
    name?: string | null;
    is_for_sale: boolean;
    seating_capacity?: number | null;
    owner_id: string;
    has_carryout: boolean;
}

export interface IngredientFormData {
    id: string;
    ingredientId?: number;
    payload?: Ingredient;
}
