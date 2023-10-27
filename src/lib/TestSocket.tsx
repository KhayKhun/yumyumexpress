import { useEffect } from "react";
import socket from "./socket";
import { useToast } from "@/components/ui/use-toast";


export default function TestSocket() {
  const {toast} = useToast();
  function JoinSocket(user_id: any) {
    socket.emit("join", user_id);
    console.log("joined")
  }
  useEffect(() => {
    socket.on("nice", () => {
      toast({
        title: "Success",
        description:
          "Successfully placed order",
      });
      console.log('placed order');
    });

    socket.on("approved", () => {
      console.log('approved');
      toast({
        title : "Order successfully approved",
        description : "Your order has been approved. The foods will be delivered ASAP."
      })
    });
    socket.on("rejected", (order: any) => {
      console.log('rejected');
      toast({
        title : "Sorry, a resturant rejected your order",
        description : order?.message ? order.message : '' 
      })
    });
  }, [socket]);

  const OrderSocket = (data:any) => {
    socket.emit("order-from-customer", data);
  };
  return {OrderSocket,JoinSocket}

}
