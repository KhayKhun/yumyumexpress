import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useFoodStore } from "../../states/foodState";
import type { foodType } from "../../constants/global.types";
import FoodCard from "./FoodCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingFoods from "../essentials/LoadingFoods";

const peginationCount = 6;
const oneTimeFetchCount = 9;

const FoodList = () => {
  const foods = useFoodStore((state: any) => state.foods);
  const updateFoods = useFoodStore((state: any) => state.updateFoods);

  const [pegination,setPegination] = useState(0);
  const [hasMore,setHasMore] = useState(true);

  async function getFoods() {
    const { data, error } = await supabase
      .from("products")
      .select()
      .range(pegination, pegination + oneTimeFetchCount);
    if (error) {
      console.log(error);
      return;
    }
    if(data.length !== 0){
      updateFoods(data);
    }else{
      setHasMore(false);
    }
  }
  useEffect(() => {
    OnScrollBottom();
  }, []);

  const OnScrollBottom = () => {
    getFoods();
    setPegination((prev) => prev + peginationCount);
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={foods.length}
        next={OnScrollBottom}
        hasMore={hasMore} // Replace with a condition based on your data source
        loader={<LoadingFoods/>}
        endMessage={<hr/>}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foods?.map((food: foodType) => {
            return <FoodCard key={food.id} foodData={food} />;
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default FoodList;

