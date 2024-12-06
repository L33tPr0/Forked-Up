import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { addOneIngredient, getInventory } from "../../redux/reducers/inventory";
import { useParams } from "react-router";

type Props = {
    [key: string]: Dispatch<SetStateAction<boolean>>;
};

const IngredientForm = ({ setIsCreateFormVisible }: Props) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [cost, setCost] = useState("1");
    const [ingredient_type, setIngredientType] = useState("All-Purpose");
    const [unit_type, setUnitType] = useState("lbs");
    const { id } = useParams();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            name,
            cost: parseFloat(cost),
            ingredient_type,
            unit_type,
            auto_ship: false,
            quantity_on_hand: 50,
            quantity_to_order: 50,
        };
        await dispatch(addOneIngredient({ payload, id: id! }));
        await dispatch(getInventory(id!));
        setIsCreateFormVisible(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between px-3"
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
                    step={0.01}
                    required
                    className="bg-gray-200 outline-none focus:border-blue-500 border-2 p-1"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
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
            <button type="submit" className="">
                Sumbit
            </button>
        </form>
    );
};

export default IngredientForm;
