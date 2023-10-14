import { toSlug } from "../../constants/functions";
import { Link, useLocation } from "react-router-dom";
import { useSelectedFoodStore } from "../../states/foodState";
import type { foodType } from "../../constants/global.types";

const ContinueCard = () => {
  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );

  const filteredFoods = selectedFoods.filter(
    (food: foodType) => food.count > 0
  );

  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  const lastResturant: any = localStorage.getItem("lastResturant");
  return (
    <div className={`
    absolute w-[200px] h-[100px] bottom-[-130px] right-[-30px] bg-gray-200 text-base text-black
    ${
        (path.includes('/resturants/') || filteredFoods.length == 0) && 'hidden'}
    `}>
      <h1>{lastResturant}</h1>
      <Link
        to={{
          pathname: `/resturants/${toSlug(lastResturant)}`,
          search: "?popup=none",
        }}
      >
        Continue
      </Link>
    </div>
  );
};

export default ContinueCard;
