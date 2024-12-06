import {
    FC,
    FormEvent,
    MouseEvent,
    ReactNode,
    useEffect,
    useState,
} from "react";
import {
    buyRestaurant,
    getRestaurants,
    sellRestaurant,
    addRestaurant,
    deleteRestaurant,
} from "../../../redux/reducers/restaurants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { RestaurantFormData } from "../../../types/FormData";
import { FaRegTrashCan } from "react-icons/fa6";

const Restaurants: FC = () => {
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();
    const [name, setName] = useState("");
    const [checked, setChecked] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [error, setError] = useState<ReactNode | null>(null);
    const owned = useAppSelector((state: RootState) => state.restaurants.owned);
    const forSale = useAppSelector(
        (state: RootState) => state.restaurants.forSale
    );
    const user = useAppSelector((state) => state.session.user);

    const checkName = () => {
        if (name.length > 24) {
            setError(
                <div className="text-red-500">
                    Name must not be more than 24 characters
                </div>
            );
        }
    };

    const handleFormSubmission = async (e: FormEvent) => {
        e.preventDefault();
        if (!error && user) {
            const payload: RestaurantFormData = {
                owner_id: user.id!,
                has_carryout: checked,
                is_for_sale: false,
                name: name.length ? name : undefined,
                seating_capacity: null,
            };
            await dispatch(addRestaurant(payload));
        }
    };

    const handleClick = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.target as HTMLButtonElement;
        const id = parseInt(button.dataset.id!, 10);
        if (button.innerText.startsWith("B")) {
            await dispatch(buyRestaurant(id));
        } else {
            await dispatch(sellRestaurant(id));
        }
    };

    const handleDelete = async (id: number) => {
        await dispatch(deleteRestaurant(id));
    };

    useEffect(() => {
        if (user) {
            dispatch(getRestaurants());
        }
    }, [dispatch, user]);
    return (
        <div className="grid columns-1 grid-rows-2 gap-8 h-full">
            <div className="w-full bg-gray-100 mt-2 flex flex-col shadow-md shadow-gray-500">
                <h2 className="text-3xl text-gray-900 p-3">
                    Restaurants for Sale
                </h2>
                <hr className="mt-1 mx-2 border-gray-900" />
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-rows-3 p-2 gap-2">
                    {forSale.map((rest) => (
                        <div
                            key={rest.id}
                            className="flex flex-col gap-y-5 items-center"
                        >
                            <div className="text-xl flex justify-around">
                                <span>{rest.name}</span>
                                <RiMoneyDollarCircleFill size={24} />
                            </div>
                            <button
                                data-id={`${rest.id}`}
                                onClick={handleClick}
                                className="text-gray-950 text-xl border-2 border-gray-500 w-3/5"
                            >
                                Buy
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full bg-gray-100 flex flex-col shadow-md shadow-gray-500">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl text-gray-900 p-3">
                        Owned restaurants
                    </h2>
                    <div
                        className="text-2xl align-middle hover:cursor-pointer mr-4 hover:underline"
                        onClick={() => setIsHidden(false)}
                    >
                        Create a new Restaurant
                    </div>
                </div>
                <form
                    className={`flex ${
                        isHidden ? "hidden" : "block"
                    } items-center justify-between mx-4`}
                    onSubmit={(e) => handleFormSubmission(e)}
                >
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Name"
                            className="text-lg bg-slate-200 outline-none"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(null);
                            }}
                            onBlur={() => checkName()}
                        />
                        {error}
                    </div>
                    <div className="flex flex-col items-center">
                        <label>Has carryout?</label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                                setChecked((prev) => !prev);
                            }}
                        />
                    </div>
                    <button onClick={() => setIsHidden(true)}>Submit</button>
                </form>
                <hr className="mt-1 mx-2 border-gray-900" />
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-rows-3 p-2 gap-2">
                    {owned.map((rest) => (
                        <div
                            key={rest.id}
                            onClick={() => navigateTo(`${rest.id}`)}
                            className="flex flex-col gap-y-5 items-center"
                        >
                            <div className="text-xl">
                                <span>{rest.name}</span>
                            </div>
                            <div className="flex justify-between w-3/5 items-center">
                                <button
                                    data-id={`${rest.id}`}
                                    onClick={handleClick}
                                    className="text-gray-950 text-xl border-2 border-gray-500 w-3/5 px-3"
                                >
                                    Sell
                                </button>

                                <FaRegTrashCan
                                    size={24}
                                    id={`${rest.id}`}
                                    className="hover:text-red-500 hover:cursor-pointer"
                                    title={`Double click to delete ${rest.name}`}
                                    onClick={(e) => e.stopPropagation()}
                                    onDoubleClick={() => handleDelete(rest.id!)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
