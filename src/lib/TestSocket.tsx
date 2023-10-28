import { useEffect } from "react";
import socket from "./socket";
import { useToast } from "@/components/ui/use-toast";
import supabase from "./supabase";


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

    socket.on("approved", (prop) => {
      async function fetchSeller() {
        const { data, error } = await supabase
          .from("sellers")
          .select("*")
          .eq("id", prop.seller_id);

        if (error) {
          console.log(error);
          return;
        }
        if (data[0]) {
          console.log(data);
          toast({
            title: "Your order is accepted by " + data[0].name + "! :)",
            description: "message: "+ "We'll delivered your foods ASAP.",
          });
        }
      }
      fetchSeller();
    });
    socket.on("rejected", (prop: any) => {
      async function fetchSeller() {
        const { data, error } = await supabase
          .from("sellers")
          .select("*")
          .eq("id", prop.seller_id);

        if (error) {
          console.log(error);
          return;
        }
        if (data[0]) {
          console.log(data);
          toast({
            title: "Order rejected by " + data[0].name + "! :(",
            description: "message: " + prop?.message,
          });
        }
      }
      fetchSeller();
    });
  }, [socket]);

  const OrderSocket = (data:any) => {
    socket.emit("order-from-customer", data);
  };
  return {OrderSocket,JoinSocket}

}
