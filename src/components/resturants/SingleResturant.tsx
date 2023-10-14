import { useParams } from "react-router-dom";
import supabase from "../../../utils/supabase";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { sellerType, foodType } from "../../constants/global.types";
import DetailFoodCard from "../foods/DetailFoodCard";
import { BsStarFill, BsBookmark } from "react-icons/bs";
import Cart from "../essentials/Cart";
import { useSelectedFoodStore } from "../../states/foodState";
import { merge } from "../../constants/functions";
import Header from "../essentials/Header";
// import { useSearchParams } from "react-router-dom";

const getCounts = (message: string, foods: foodType[]) => {
  const counts = foods?.map((food) => food.count);
  console.log(message, "==>", counts);
};

const SingleResturant = () => {
  // const [searchParams,setSearchParams] = useSearchParams();
  // const popup = searchParams.get("popup");

  const navigate = useNavigate();
  const { resturantSlug } = useParams();

  const [seller, setSeller] = useState<sellerType | null>(null);

  const firstRender = useRef(true);

  const setSelectedFoods = useSelectedFoodStore(
    (state: any) => state.setSelectedFoods
  );

  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );

  getCounts("normal", selectedFoods);

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
      <Header/>
      <section className="w-[64%]">
        {/* Head */}
        <div className="relative w-full p-[40px] bg-primary-green bg-opacity-10">
          {seller?.image && (
            <img
              src={seller?.image}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
              alt="resturant"
            />
          )}
          {/* Detail functions */}
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-wide">{seller?.name}</h1>
            <p>{seller?.address}</p>
            <button className="hover:underline flex items-center gap-1">
              <BsStarFill className="text-amber-500" />
              4.5 (25)
            </button>
            <div className="flex gap-1">
              <p>Asian</p>|<p>Chinese</p>|<p>Vegetarian</p>|<p>Salad</p>|
            </div>
            <div className="w-full flex justify-end">
              <button className="flex gap-2 items-center text-green-800 border border-green-800 p-2 rounded-lg">
                Save Resturant <BsBookmark className="" />
              </button>
            </div>
          </div>
        </div>
        {/* Foods */}
        <ul className="grid grid-cols-2 px-[40px] py-3 gap-3">
          {selectedFoods?.map((food: foodType) => (
            <DetailFoodCard key={food.id} foodData={food} />
          ))}
        </ul>
      </section>
      {/* Cart */}
      <div className="sticky flex-1 h-screen top-0 right-0">
        <Cart name={seller?.name} address={seller?.address} />
      </div>
    </main>
  );
};

export default SingleResturant;
