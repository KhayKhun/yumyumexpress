import type { foodType } from "../../constants/global.types";
import { useSelectedFoodStore } from "../../states/foodState";
import { DashIcon, PlusIcon } from "../essentials/Icons";

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
    <li className="flex items-center px-0 sm:px-2 overflow-hidden">
      <div className="w-[45px] sm:w-[70px] h-[45px] sm:h-[70px] bg-gray-300 rounded-lg overflow-hidden">
        <img
          src={foodData.image}
          alt="food image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* text area */}
      <div className="w-full px-4 py-2 flex flex-col sm:gap-3 justify-between">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-[13px] sm:text-sm tracking-wide sm:leading-4">
            {foodData.name}
          </h1>
          <span className="text-gray-400 sm:font-semibold text-[13px] sm:text-sm tracking-wide">
            <span className="tracking-normal">MMK </span>
            {foodData.price}
          </span>
        </div>
        {/* Details */}
        <hr />
        <section className="w-full flex justify-between">
          <div className="flex gap-1 sm:gap-2 items-center justify-between border border-primary-green px-1 bg-white shadow-md">
            <button
              onClick={(e) => {
                e.preventDefault();
                decreaseCount(foodData.id);
              }}
              className="text-primary-green font-semibold text-sm"
            >
              <DashIcon className="text-2xl" />
            </button>
            <p className="text-primary-green text-sm">{foodData.count}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                increaseCount(foodData.id);
              }}
              className="text-primary-green font-semibold text-sm"
            >
              <PlusIcon className="text-2xl" />
            </button>
          </div>
          <span className=" text-gray-700 sm:font-semibold text-[12px] sm:text-sm tracking-wide">
            <span className="tracking-normal">MMK </span>
            {foodData.price * foodData.count}{" "}
          </span>
        </section>
      </div>
    </li>
  );
};

export default FoodCardInCart;
