import { useEffect, useRef, useMemo } from "react";
import { useSelectedFoodStore } from "../../states/foodState";
import type { foodType } from "../../constants/global.types";
import { Link } from "react-router-dom";
import AuthComponent from "../auth/AuthComponent";
import { toSlug } from "../../constants/functions";
import { CartIcon, HeartLineIcon, HistoryIcon } from "./Icons";

const Header = () => {
  const firstRender = useRef(true);
  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );

  const filteredFoods = useMemo(() => {
    return selectedFoods?.filter((food: foodType) => food.count > 0);
  }, [selectedFoods]);

  const lastResturantSlug = () => {
    const lastResturant = localStorage.getItem("lastResturant");
    if (lastResturant && filteredFoods?.length > 0)
      return "/resturants/" + toSlug(lastResturant) + "?popup=none";
    else return "";
  }

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
  }, [selectedFoods]);

  const localData = localStorage.getItem("selectedFoods");

  return (
    <main className="flex items-center justify-between px-[40px] fixed z-40 top-0 left-0 w-screen h-[60px] shadow-md text-primary-green bg-white">
      <Link to="/" className="logo flex items-center gap-2">
        <img src="/logo-big.png" className="w-[32px]" />
        <span className="text-primary-green font-sans dosis text-lg">
          Yum Yum Express
        </span>
      </Link>

      <ul className="flex gap-7 items-center text-2xl">
        <Link to="/history">
          <HistoryIcon />
        </Link>
        <AuthComponent />
        <Link to="/favorites">
          <HeartLineIcon />
        </Link>
        <Link
          to={lastResturantSlug() !== "" ? lastResturantSlug() : "/foods"}
          className="relative"
        >
          <CartIcon />
          <div
            className={`absolute top-[-10px] right-[-10px] bg-red-600 rounded-full w-[20px] h-[20px] text-white text-sm flex justify-center items-center ${
              filteredFoods?.length === 0 && "hidden"
            }`}
          >
            {firstRender.current
              ? // showdata for the first render
                localData
                ? JSON?.parse(localData)?.filter(
                    (food: foodType) => food.count > 0
                  ).length
                : 0
              : // after the first render
                filteredFoods?.length}
          </div>

          {/* <ContinueCard/> */}
        </Link>
      </ul>
    </main>
  );
};

export default Header;
