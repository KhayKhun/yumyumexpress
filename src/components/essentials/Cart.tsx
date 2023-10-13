import { BsBag } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useSelectedFoodStore } from "../../states/foodState";
import { foodType } from "../../constants/global.types";
import FoodCardInCart from "../foods/FoodCardInCart";
import { useRef } from "react";

const Cart = ({ name, address }: any) => {
  const deliFee = 500;
  const addressRef = useRef<any>(null);
  const selectedFoods = useSelectedFoodStore(
    (state: any): [] => state.selectedFoods
  );

  const filteredFoods = selectedFoods.filter(
    (food: foodType) => food.count > 0
  );

  const subTotal = filteredFoods
    .map((f: foodType) => {
      return f.price * f.count;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return (
    <main className=" w-full h-full bg-white border-l border-primary-green px-3 flex flex-col gap-2">
      <h1 className="flex gap-2 font-semibold mx-auto text-xl items-center text-primary-green">
        My Cart <BsBag className="" />
      </h1>
      <p className="text-gray-700">
        From:{" "}
        <span className="text-black">
          {name} ({address})
        </span>
      </p>
      <div className="flex gap-2 items-center text-gray-700">
        To:{" "}
        <input
          type="text"
          className="text-black hover:outline-none border p-2 rounded-lg bg-gray-50"
          defaultValue={"12nd, YAK Q, Taunggyi."}
          ref={addressRef}
          disabled
        />
        <button>
          <FiEdit />
        </button>
      </div>
      <ul className="overflow-y-auto p-4 min-h-[100px] h-[40vh] border-t border-b bg-gray-50">
        {filteredFoods?.reverse().map((food: foodType) => (
          <FoodCardInCart key={food.id} foodData={food} />
        ))}
      </ul>
      <section className="flex flex-col gap-2 text-gray-800">
        <h1 className="w-full flex justify-between">
          <span>Items: </span>
          <span className="font-semibold tracking-wide">
            {filteredFoods.length}
          </span>
        </h1>
        <h1 className="w-full flex justify-between">
          <span>Subtotal: </span>
          <span className="font-semibold tracking-wide">MMK {subTotal}</span>
        </h1>
        <h1 className="w-full flex justify-between">
          <span>Delivery Fee: </span>
          <span className="font-semibold tracking-wide">MMK {deliFee}</span>
        </h1>
        <hr />
        <h1 className="w-full flex justify-between">
          <span>Total: </span>
          <span className="font-semibold tracking-wide">
            MMK {subTotal + deliFee}
          </span>
        </h1>
        <button
          disabled={filteredFoods.length === 0}
          onClick={() => alert("hi")}
          className={` text-white w-full p-2 rounded-lg  ${
            filteredFoods.length === 0
              ? "bg-gray-500"
              : "bg-primary-green hover:bg-green-500"
          }`}
        >
          Review Receipt
        </button>
      </section>
    </main>
  );
};

export default Cart;
