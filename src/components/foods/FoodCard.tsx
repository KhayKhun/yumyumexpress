import { useEffect, useState } from "react";
import type { foodType, sellerType } from "../../constants/global.types";
import supabase from "../../lib/supabase";
import { Link } from "react-router-dom";
import { toSlug } from "../../constants/functions";
import { ResturantIcon, StarFillIcon } from "../essentials/Icons";

type Props = {
  foodData: foodType;
};

function splitTitle(title: any){
  if(title){
    if (title.length > 12) {
      return title.substring(0, 12) + "...";
    } else {
      return title;
    }
  }else{
    return '';
  }
}

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
    <Link
      to={{
        pathname: `/resturants/${toSlug(seller?.name)}`,
        search: `?popup=none`,
      }}
      className="border flex overflow-hidden hover:shadow-lg hover:rotate-1"
    >
      <div className="w-[75px] md:w-[150px] h-full bg-gray-300">
        <img
          src={foodData.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* text area */}
      <div className="w-full px-4 py-2 flex flex-col justify-between text-sm sm:text-base">
        {/* Title */}
        <div>
          <h1 className=" font-semibold leading-4">{foodData.name}</h1>
          <span className="text-gray-500 tracking-wider">
            <span className="tracking-normal">MMK </span>
            {foodData.price}
          </span>
        </div>
        {/* Details */}
        {/* <div className="w-full flex flex-row-reverse justify-between"> */}
        <span className="flex items-center gap-2 ">
          <StarFillIcon className="text-amber-600 font-lg" />
          4.5
        </span>
        <button className="underline text-primary-green transition-all duration-100 flex font-semibold justify-end text-sm items-center gap-3">
          {splitTitle(seller?.name)} <ResturantIcon />
        </button>
        {/* </div> */}
      </div>
    </Link>
  );
};

export default FoodCard;
