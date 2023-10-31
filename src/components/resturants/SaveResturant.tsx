import { useAuthStore } from "@/states/authState";
import { HeartFillIcon, HeartLineIcon } from "../essentials/Icons";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useSellerStore } from "@/states/resturantState";

const SaveResturant = () => {
  const user = useAuthStore((state: any) => state.user);
  const seller = useSellerStore((state: any) => state.seller);
    const [saved,setSaved] = useState(false);

  async function saveResturant() {
    console.log("save");

    const { error } = await supabase.from("favourites").insert({
      customer_id: user.id,
      seller_id: seller.id,
    });
    if (error) {
      console.log(error);
      return;
    }
    checkIsSaved();
  }
  async function deleteResturant() {
    console.log('delete')
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("customer_id", user.id)
      .eq("seller_id", seller.id);

    if (error) {
      console.log(error);
      return;
    }
    checkIsSaved();
  }

  async function checkIsSaved() {

    const { data, error } = await supabase
      .from("favourites")
      .select()
      .eq("customer_id", user.id)
      .eq("seller_id", seller.id);

    if (error) {
        console.log(error);
      return;
    }
    console.log(data)
    if (data?.length > 0) {
        setSaved(true)
    }else{
        setSaved(false)
    }
  }

  async function toggleSave() {

    const { data, error } = await supabase
      .from("favourites")
      .select()
      .eq("customer_id", user.id)
      .eq("seller_id", seller.id);

    if (error) {
        console.log(error);
      return;
    }
    if (data?.length > 0) {
        deleteResturant();
    }
    if (data?.length === 0) {
        saveResturant();
    }
  }

  useEffect(() => {
    console.log('rendered')
    if (user?.id && seller?.id) {
        console.log('data not null')
      checkIsSaved();
    }
  }, [user,seller]);

  return (
    <button
      // disabled={isSaved}
      onClick={toggleSave}
      className={`flex gap-2 items-center 
       p-2 text-[12px] sm:text-base rounded-lg
       ${
        !saved
           ? " text-green-800 border border-green-800"
           : "bg-green-800 text-white"
       }`}
    >
      {saved ? (
        <>
          Saved
          <HeartFillIcon />
        </>
      ) : (
        <>
          Save Resturant
          <HeartLineIcon />
        </>
      )}{" "}
    </button>
  );
};

export default SaveResturant;
