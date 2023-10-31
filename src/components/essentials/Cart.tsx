import { useSelectedFoodStore } from "../../states/foodState";
import { foodType, orderType } from "../../constants/global.types";
import FoodCardInCart from "../foods/FoodCardInCart";
import { useEffect, useMemo, useState } from "react";
import {  ShoppingBagIcon } from "./Icons";
import { useAuthStore } from "../../states/authState";
import { useSellerStore } from "../../states/resturantState";
import { Button } from "../ui/button";
import supabase from "@/lib/supabase";
import TestSocket from "@/lib/TestSocket";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ReceiptReview from "./ReceiptReview";
import { useNavigate } from "react-router-dom";

const Cart = ({ resturantName, address }: any) => {
  const navigate = useNavigate();
  const {OrderSocket} = TestSocket();
  const deliFee = useMemo(() => 500, []);
  const [currentAddress,setCurrentAddress] = useState('');
  const [customerMessage,setCustomerMessage] = useState<string|null>(null);
  const setSelectedFoods = useSelectedFoodStore((state:any) => state.setSelectedFoods)
  const user = useAuthStore((state: any) => state.user);
  const seller = useSellerStore((state: any) => state.seller);
  const selectedFoods = useSelectedFoodStore(
    (state: any): [] => state.selectedFoods
  );
  const filteredFoods: foodType[] = useMemo(() => {
    return selectedFoods?.filter((food: foodType) => food.count > 0);
  }, [selectedFoods]);

  const subTotal = useMemo(() => {
    return filteredFoods
      ?.map((f: foodType) => {
        return f.price * f.count;
      })
      ?.reduce((a, b) => {
        return a + b;
      }, 0);
  }, [filteredFoods]);

  const submitOrder = async () => {
    const receiptData = {
      customer_message: customerMessage,
      customer_id: user?.id,
      seller_id: seller?.id,
      address: currentAddress,
      total: subTotal + deliFee,
      delivery_fee: deliFee,
    };
    try {
      const { data, error }: any = await supabase
        .from("orders")
        .insert(Array(receiptData))
        .select();

      if (error) {
        console.log(error);
        return;
      }
      if (data[0]?.id) {
        insertOrderItems(data[0]);
        return;
      }
      alert("unknown data inserting error");
    } catch (e) {
      console.log(e);
    }
  };
  const insertOrderItems = async (order:orderType) => {
    const orderItemList = filteredFoods.map((food) => ({
      order_id: order.id,
      product_id: food.id,
      quantity: food.count,
      total_price: food.count * food.price,
    }));

    const { error } = await supabase
      .from("order_items")
      .insert(orderItemList)
      .select();

    if (error) {
      console.log(error);
      return;
    }
    OrderSocket(order);
    navigate('/history/'+order.id);
    localStorage.removeItem('selectedItems');
    setSelectedFoods([])
  
  };
  const fetchProfile = async () => {
    const {data,error} = await supabase
    .from('profiles')
    .select('*')
    .eq('id',user?.id)

    if(error){
      console.log(error);
      return;
    }
    if(data.length > 0){
      setCurrentAddress(data[0].address)
    }
  }

  useEffect(()=>{
    if(user?.id){
      fetchProfile();
    }
  },[user]);
  return (
    <main className=" w-full h-full bg-white border-0 sm:border-l border-primary-green px-1 sm:px-3 flex flex-col gap-2">
      <h1 className="flex gap-2 font-semibold mx-auto text-xl items-center text-primary-green">
        My Cart <ShoppingBagIcon />
      </h1>
      <p className="text-gray-700">
        From:{" "}
        <span className="text-black">
          {resturantName} ({address})
        </span>
      </p>
      <div className="flex gap-2 items-center text-gray-700">
        To:{" "}
        <input
          type="text"
          className="text-black hover:outline-none border p-2 rounded-lg bg-gray-50"
          placeholder="Address required"
          defaultValue={currentAddress}
          onChange={(e) => {
            setCurrentAddress(e.target.value);
          }}
        />
      </div>
      <ul className="overflow-y-auto sm:p-4 min-h-[100px] h-[40vh] border-t border-b bg-gray-50">
        {filteredFoods?.reverse().map((food: foodType) => (
          <FoodCardInCart key={food.id} foodData={food} />
        ))}
      </ul>
      <section className="flex flex-col gap-2 text-gray-800">
        <h1 className="w-full flex justify-between">
          <span>Items: </span>
          <span className="font-semibold tracking-wide">
            {filteredFoods?.length}
          </span>
        </h1>
        <h1 className="w-full flex justify-between">
          <span>Subtotal: </span>
          <span className="font-semibold tracking-wide">MMK {subTotal}</span>
        </h1>
        <h1 className="w-full flex justify-between">
          <span>Delivery Fee: </span>
          <span className="font-semibold tracking-wide">MMK {deliFee}</span>
        </h1>
        <hr />
        <h1 className="w-full flex justify-between">
          <span>Total: </span>
          <span className="font-semibold tracking-wide">
            MMK {subTotal + deliFee}
          </span>
        </h1>
        <Dialog>
          <DialogTrigger
            disabled={filteredFoods?.length === 0}
            className={` text-white w-full p-2 rounded-lg  ${
              filteredFoods?.length === 0
                ? "bg-gray-500"
                : "bg-primary-green hover:bg-green-500"
            }`}
          >
            Review Receipt
          </DialogTrigger>
          <DialogContent className="text-sm sm:text-base">
            <DialogHeader>
              <DialogTitle className="m-auto text-sm sm:text-base">
                Orders from {resturantName}
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[50vh]">
              <ReceiptReview
                receiptData={{
                  username: user?.user_metadata.name,
                  user_id: user?.id,
                  sellername: seller?.name,
                  seller_id: seller?.id,
                  address: currentAddress,
                  delivery_fee: deliFee,
                  total: subTotal + deliFee,
                  subTotal: subTotal,
                  item_count: filteredFoods?.length,
                  selected_foods: filteredFoods,
                }}
              />
            </div>
            <input
              type="text"
              className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
              placeholder="special message (optional)"
              onChange={(e) => {
                setCustomerMessage(e.target.value);
              }}
            />
            <div className="flex justify-between">
              <DialogClose className="h-10 px-4 py-2 text-sm sm:text-base hover:bg-accent hover:text-accent-foreground rounded-lg border">
                Cancel
              </DialogClose>
              <Button
                onClick={submitOrder}
                className="bg-primary-green text-white px-7 hover:bg-green-500 text-sm sm:text-base"
              >
                Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
};

export default Cart;
