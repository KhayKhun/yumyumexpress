import { useEffect, useState } from "react";
import type { foodType, sellerType } from "../../constants/global.types";
import supabase from "../../../utils/supabase";
import { BsShopWindow, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toSlug } from "../../constants/functions";

type Props = {
  foodData: foodType;
};

const FoodCard = ({ foodData }: Props) => {
  const [seller, setSeller] = useState<sellerType | null>(null);
  useEffect(() => {
    async function fetchSellerData() {
      const { data, error } = await supabase
        .from("sellers")
        .select()
        .eq("id", foodData.seller_id);

      if (error) {
        console.log(error);
        return;
      }
      setSeller(data[0]);
    }
    fetchSellerData();
  }, []);

  return (
    <li className="border flex rounded-lg overflow-hidden">
      <div className="w-[150px] h-full bg-gray-300">
        <img
          src={foodData.image}
          alt="food image"
          className="w-full h-full object-cover"
        />
      </div>
      {/* text area */}
      <div className="w-full px-4 py-2 flex flex-col justify-between">
        {/* Title */}
        <div>
          <span className="text-gray-500 font-semibold text-xl tracking-widest">
            <span className="tracking-normal">MMK</span> 
            {foodData.price}
          </span>
          <h1 className="font-bold text-lg tracking-wide leading-6">
            {foodData.name}
          </h1>
        </div>
        {/* Details */}
        <div className="w-full flex flex-row-reverse justify-between">
          <Link
            to={{pathname : `/resturants/${toSlug(seller?.name)}`,search : `?popup=none`}}
            className="text-primary-green flex font-semibold text-sm items-center gap-3 border border-primary-green rounded-lg p-2"
          >
            {seller?.name} <BsShopWindow />
          </Link>
          <span className="flex items-center gap-2 ">
            <BsStarFill className="text-amber-600 font-lg" />
            4.5
          </span>
        </div>
      </div>
    </li>
  );
};

export default FoodCard;
