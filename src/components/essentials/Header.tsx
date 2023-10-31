import { useEffect, useRef, useMemo } from "react";
import { useSelectedFoodStore } from "../../states/foodState";
import type { foodType } from "../../constants/global.types";
import { Link } from "react-router-dom";
import AuthComponent from "../auth/AuthComponent";
import { toSlug } from "../../constants/functions";
import { CartIcon, HeartLineIcon, HistoryIcon } from "./Icons";
import Cart from "./Cart";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSellerStore } from "@/states/resturantState";


const Header = () => {
  const firstRender = useRef(true);
  const selectedFoods = useSelectedFoodStore(
    (state: any) => state.selectedFoods
  );
  const seller = useSellerStore((state: any) => state.seller);

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
    <main className="flex items-center justify-between px-[20px] sm:px-[40px] fixed z-40 top-0 left-0 w-screen h-[50px] sm:h-[60px] shadow-md text-primary-green bg-white">
      <Link to="/" className="logo flex items-center gap-2">
        <img src="/logo-big.png" className="w-[24px] sm:w-[32px]" />
        <span className="text-primary-green font-sans dosis text-lg sm:inline-block hidden">
          Yum Yum Express
        </span>
      </Link>

      <ul className="flex gap-7 items-center text-base sm:text-xl md:text-2xl">
        <Link to="/history">
          <HistoryIcon />
        </Link>
        <AuthComponent />
        <Link to="/favourites">
          <HeartLineIcon/>
        </Link>
        <Link
          to={lastResturantSlug() !== "" ? lastResturantSlug() : "/foods"}
          className="relative hidden sm:block"
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
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger className="relative">
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
            </SheetTrigger>
            <SheetContent className="overflow-auto">
              <Cart resturantName={seller?.name} address={seller?.address} />
            </SheetContent>
          </Sheet>
        </div>
      </ul>
    </main>
  );
};

export default Header;
