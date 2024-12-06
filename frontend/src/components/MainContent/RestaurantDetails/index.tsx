import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useParams } from "react-router";
import {
    deleteOneIngredient,
    getInventory,
} from "../../../redux/reducers/inventory";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import IngredientEditForm from "../../IngredientEditForm";
import IngredientForm from "../../IngredientForm";

const RestaurantDetails: FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState("0");
    const ingredients = useAppSelector((state) => state.inventory.ingredients);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

    const handleDelete = async (id: number) => {
        await dispatch(deleteOneIngredient(id));
    };

    useEffect(() => {
        dispatch(getInventory(id!));
    }, [dispatch, id]);

    return (
        <div className="grid w-full h-full grid-cols-2 place-items-center gap-x-3">
            <div className="flex flex-col w-full h-full shadow-gray-900 shadow-sm">
                <div className="flex justify-between w-full">
                    <h2 className="text-3xl p-4 pb-1">Menu</h2>
                    <div className="hover:cursor-pointer"></div>
                </div>
                <hr className="border-slate-900 my-2 mx-3" />
            </div>
            <div className="flex flex-col w-full h-full shadow-gray-900 shadow-sm">
                <div className="flex justify-between w-full p-4 pb-1 items-center">
                    <h2 className="text-3xl">Inventory</h2>
                    <div
                        className={`hover:cursor-pointer text-2xl hover:underline`}
                        onClick={() => setIsCreateFormVisible(true)}
                    >
                        Add ingredient
                    </div>
                </div>
                {isCreateFormVisible && (
                    <IngredientForm
                        setIsCreateFormVisible={setIsCreateFormVisible}
                    />
                )}
                <hr className="border-slate-900 mx-3 my-2" />
                <div className="grid grid-rows-12 h-full place-items-center overflow-scroll">
                    {ingredients &&
                        ingredients.map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className="flex flex-col w-full h-full m-2 px-2 border-b-2 items-center justify-between"
                            >
                                <div className="flex w-full h-full m-2 px-2 items-center justify-between">
                                    <div className="flex flex-col justify-around">
                                        <div className="text-base">
                                            {ingredient.name}
                                        </div>
                                        <div>
                                            <div>
                                                Cost: {ingredient.cost} /{" "}
                                                {ingredient.unit_type}
                                            </div>
                                            <div>
                                                Ingredient Type:{" "}
                                                {ingredient.ingredient_type}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {isEdit !== `${ingredient.id}` && (
                                            <FaRegEdit
                                                size={24}
                                                data-id={`${ingredient.id}`}
                                                className="hover:text-yellow-500 hover:cursor-pointer"
                                                title={`Double click to edit ${ingredient.name}`}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                onDoubleClick={(e) =>
                                                    setIsEdit(
                                                        (
                                                            e.target as HTMLDivElement
                                                        ).dataset.id!
                                                    )
                                                }
                                            />
                                        )}
                                        <FaRegTrashCan
                                            size={24}
                                            id={`${ingredient.id}`}
                                            className="hover:text-red-500 hover:cursor-pointer"
                                            title={`Double click to delete ${ingredient.name}`}
                                            onClick={(e) => e.stopPropagation()}
                                            onDoubleClick={() =>
                                                handleDelete(ingredient.id!)
                                            }
                                        />
                                    </div>
                                </div>
                                {isEdit === `${ingredient.id}` && (
                                    <IngredientEditForm
                                        ingredient={ingredient}
                                        setIsEdit={setIsEdit}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
