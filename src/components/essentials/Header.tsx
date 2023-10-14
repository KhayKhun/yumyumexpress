import { useEffect, useRef } from "react";
import { RiHeart3Line, RiUser3Line } from "react-icons/ri";
import { BsCart2 } from "react-icons/bs";
import { useSelectedFoodStore } from "../../states/foodState";
import type { foodType } from "../../constants/global.types";
import { Link } from "react-router-dom";
// import ContinueCard from './ContinueCard';

const Header = () => {
  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );

  const firstRender = useRef(true);
  const filteredFoods = selectedFoods?.filter(
    (food: foodType) => food.count > 0
  );

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

      <ul className="flex gap-7 text-2xl">
        <Link to="/my-info">
          <RiUser3Line />
        </Link>
        <Link to="/favorites">
          <RiHeart3Line />
        </Link>
        <button className="relative">
          <BsCart2 />
          <div className="absolute top-[-10px] right-[-10px] bg-red-600 rounded-full w-[20px] h-[20px] text-white text-sm flex justify-center items-center">
            {firstRender.current
              ? localData
                ? JSON?.parse(localData).filter(
                    (food: foodType) => food.count > 0
                  ).length
                : 0 // Handle the case when "selectedFoods" is not found in localStorage
              : filteredFoods?.length}
          </div>

          {/* <ContinueCard/> */}
        </button>
      </ul>
    </main>
  );
};

export default Header;
