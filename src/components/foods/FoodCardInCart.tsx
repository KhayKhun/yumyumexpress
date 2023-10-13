import type { foodType } from "../../constants/global.types";
import { BsDash, BsPlus} from "react-icons/bs";
import { useSelectedFoodStore } from "../../states/foodState";

type Props = {
  foodData: foodType;
};


const FoodCardInCart = ({ foodData }: Props) => {
  const increaseCount = useSelectedFoodStore(
    (state: any) => state.increaseCount
  );
  const decreaseCount = useSelectedFoodStore(
    (state: any) => state.decreaseCount
  );

  return (
    <li className="flex items-center px-2 overflow-hidden">
      <div className="w-[70px] h-[70px] bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={foodData.image}
          alt="food image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* text area */}
      <div className="w-full px-4 py-2 flex flex-col gap-3 justify-between">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm tracking-wide leading-4">
            {foodData.name}
          </h1>
          <span className="text-gray-400 font-semibold text-sm tracking-wide">
            <span className="tracking-normal">MMK</span>
            {foodData.price}
          </span>
        </div>
        {/* Details */}
        <hr />
        <section className="w-full flex justify-between">
          <div className="flex gap-2 justify-between border border-primary-green px-1 bg-white shadow-md">
            <button
              onClick={(e) => {
                e.preventDefault();
                decreaseCount(foodData.id);
              }}
              className="text-primary-green font-semibold text-sm"
            >
              <BsDash className="text-2xl" />
            </button>
            <p className="text-primary-green text-sm">{foodData.count}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                increaseCount(foodData.id);
              }}
              className="text-primary-green font-semibold text-sm"
            >
              <BsPlus className="text-2xl" />
            </button>
          </div>
          <span className=" text-gray-700 font-semibold text-sm tracking-wide">
            <span className="tracking-normal">MMK </span>
            {foodData.price * foodData.count}{" "}
          </span>
        </section>
      </div>
    </li>
  );
};

export default FoodCardInCart;
