export interface Ingredient {
    name: string;
    cost: number;
    ingredient_type: string;
    auto_ship: boolean;
    unit_type: string;
    quantity_on_hand: number;
    quantity_to_order: number;
}

export interface Restaurant {
    owner_id: string;
    has_carryout: boolean;
    is_for_sale: boolean;
    name: string;
    id?: number;
}

export interface Inventory {
    restaurant_id: number;
}

export interface User {
    email?: string | null;
    password: string;
    username: string;
}
