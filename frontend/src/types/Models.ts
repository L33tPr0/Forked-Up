interface Model {
    id?: number;
}

export interface Ingredient extends Model {
    name: string;
    cost: number;
    ingredient_type: string;
    auto_ship?: boolean;
    unit_type: string;
    quantity_on_hand: number;
    quantity_to_order: number;
}

export interface Restaurant extends Model {
    owner_id: string | null;
    has_carryout: boolean;
    is_for_sale: boolean;
    name: string;
    seating_capacity: number | null;
}

export interface Inventory extends Model {
    restaurant_id: number;
    ingredient: Ingredient[];
}

export interface User {
    id?: string;
    email?: string | null;
    password: string;
    username: string;
}

export interface Owner {
    id: string;
    email: string;
    username: string;
    avatar?: string;
}
