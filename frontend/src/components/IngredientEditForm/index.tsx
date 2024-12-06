import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Ingredient } from "../../types/Models";
import { useAppDispatch } from "../../redux/hooks";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { useParams } from "react-router";
import {
    editOneIngredient,
    getInventory,
} from "../../redux/reducers/inventory";

type Props = {
    ingredient: Ingredient;
    setIsEdit: Dispatch<SetStateAction<string>>;
};

const IngredientEditForm = ({ ingredient, setIsEdit }: Props) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(ingredient.name);
    const [cost, setCost] = useState(ingredient.cost);
    const ingredientId = useState(ingredient.id)[0];
    const [ingredient_type, setIngredientType] = useState(
        ingredient.ingredient_type
    );
    const [unit_type, setUnitType] = useState(ingredient.unit_type);
    const { id } = useParams();

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            cost,
            ingredient_type,
            unit_type,
            quantity_on_hand: 50,
            quantity_to_order: 50,
        };

        await dispatch(editOneIngredient({ payload, id: id!, ingredientId }));
        await dispatch(getInventory(id!));
        setIsEdit("0");
    };

    return (
        <form
            onSubmit={handleEdit}
            className="flex items-center justify-between px-3 py-1 w-full"
        >
            <label className="flex flex-col">
                Name
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    className="bg-gray-200 outline-none focus:border-blue-500 border-2 p-1"
                    required
                    maxLength={24}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label className="flex flex-col">
                USD Cost
                <input
                    type="number"
                    min={1}
                    max={500}
                    required
                    className="bg-gray-200 outline-none focus:border-blue-500 border-2 p-1"
                    value={cost}
                    onChange={(e) => setCost(parseFloat(e.target.value))}
                />
            </label>
            <select
                name=""
                id=""
                className="bg-gray-400 hover:cursor-pointer"
                onChange={(e) => setIngredientType(e.target.value)}
                defaultValue={ingredient_type}
                title="Ingredient Type"
            >
                <option value="All-Purpose">All-Purpose</option>
                <option value="Meat">Meat</option>
                <option value="Dairy">Dairy</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Seasoning">Seasoning</option>
            </select>
            <select
                name=""
                id=""
                className="bg-gray-400 hover:cursor-pointer"
                onChange={(e) => setUnitType(e.target.value)}
                defaultValue={unit_type}
                title="Unit Type"
            >
                <option value="Pounds">lbs</option>
                <option value="Ounces">oz</option>
                <option value="Liters">L</option>
                <option value="Dozen">Doz</option>
                <option value="Gallon">Gal</option>
                <option value="Bulb">Bulb</option>
                <option value="Aromatic">Aromatic</option>
            </select>
            <button type="submit">
                <FaRegFloppyDisk
                    size={24}
                    id={`${ingredient.id}`}
                    className="hover:text-green-500 hover:cursor-pointer"
                    title={`Click to save ${ingredient.name}`}
                />
            </button>
        </form>
    );
};

export default IngredientEditForm;
