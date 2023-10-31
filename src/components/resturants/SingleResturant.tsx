import { useParams } from "react-router-dom";
import supabase from "../../lib/supabase";
import { useEffect,  useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { foodType } from "../../constants/global.types";
import DetailFoodCard from "../foods/DetailFoodCard";
import Cart from "../essentials/Cart";
import { useSelectedFoodStore } from "../../states/foodState";
import { merge } from "../../constants/functions";
import Header from "../essentials/Header";
import {  StarFillIcon } from "../essentials/Icons";
import { useSellerStore } from "../../states/resturantState";
import NavigateBar from "../essentials/NavigateBar";
import SaveResturant from "./SaveResturant";

const SingleResturant = () => {
  const setSeller = useSellerStore((state:any) => state.setSeller)
  const seller = useSellerStore((state:any) => state.seller)
  const navigate = useNavigate();
  const { resturantSlug } = useParams();

  const firstRender = useRef(true);

  const setSelectedFoods = useSelectedFoodStore(
    (state: any) => state.setSelectedFoods
  );

  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );

  useEffect(() => {
    const savedSelectedFoods: any = localStorage.getItem("selectedFoods");
    const foodArr = JSON.parse(savedSelectedFoods);
    setSelectedFoods(foodArr);
  }, []);

  useEffect(() => {
    // Check if it's not the initial render
    if (!firstRender.current) {
      localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
    } else {
      // After the initial render, set firstRender to false.
      firstRender.current = false;
    }
  }, [selectedFoods]);

  async function fetchResturantData() {
    const { data, error } = await supabase
      .from("sellers")
      .select()
      .eq("slug", resturantSlug);

    if (error) {
      console.log(error);
      return;
    }
    if (data.length === 0) {
      navigate("/foods");
      return;
    }
    localStorage.setItem("lastResturant", data[0].name);
    setSeller(data[0]);
  }
  async function fetchFoods() {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("seller_id", seller?.id);

    if (error) {
      console.log(error);
      return;
    }
    if (data.length === 0) {
    
      navigate("/foods");
      return;
    }
    const savedFoods: any = localStorage.getItem("selectedFoods");
    const res = merge(data, JSON.parse(savedFoods));

    setSelectedFoods(res);
  }

  useEffect(() => {
    fetchResturantData();
  }, []);

  useEffect(() => {
    if (Number(seller?.id)) {
      fetchFoods();
    }
  }, [seller]);
  return (
    <main className="flex w-screen bg-gray-100">
      <Header />
      <section className="w-full sm:w-[64%]">
        {/* Head */}
        <div className="relative w-full p-[10px] sm:p-[40px] bg-primary-green bg-opacity-10">
          {seller?.image && (
            <img
              src={seller?.image}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
              alt="resturant"
            />
          )}
          {/* Detail functions */}
          <div className="relative z-10">
            <NavigateBar
              links={[
                {
                  display: "Home",
                  link: "/",
                },
                {
                  display: seller?.name,
                  link: "/resturants/" + seller?.slug,
                },
              ]}
            />
            <h1 className="text-lg sm:text-3xl font-bold tracking-wide">
              {seller?.name}
            </h1>
            <p className="text-sm sm:text-base">{seller?.address}</p>
            <button className="hover:underline flex items-center gap-1 text-sm sm:text-base">
              <StarFillIcon className="text-amber-500" />
              4.5 (25)
            </button>
            <div className="flex gap-1 text-sm sm:text-base">
              <p>
                {seller?.opens_at} - {seller?.closes_at}
              </p>
            </div>
            <div className="w-full flex justify-end">
              <SaveResturant/>
            </div>
          </div>
        </div>
        {/* Foods */}
        <ul className="grid grid-cols-1 md:grid-cols-2 px-[10px] sm:px-[40px] py-3 gap-3">
          {selectedFoods?.map((food: foodType) => (
            <DetailFoodCard key={food.id} foodData={food} />
          ))}
        </ul>
      </section>
      {/* Cart */}
      <div className="sticky flex-1 h-screen top-0 right-0 sm:block hidden">
        <Cart resturantName={seller?.name} address={seller?.address} />
      </div>
    </main>
  );
};

export default SingleResturant;
