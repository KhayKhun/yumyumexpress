import supabase from "@/lib/supabase";
import { useAuthStore } from "@/states/authState";
import { useEffect, useState } from "react";
import Header from "../essentials/Header";
import { orderType } from "@/constants/global.types";
import { formatRelativeDate } from "@/constants/functions";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ResturantName from "./ResturantName";
import { useNavigate } from "react-router-dom";
import { userOrderStore } from "@/states/orderState";
const HistoryMain = () => {
  const navigate = useNavigate();
  const orders = userOrderStore((state:any) => state.orders);
  const setOrders = userOrderStore((state:any) => state.setOrders);
  const user = useAuthStore((state: any) => state.user);
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", user.id);
    if (error) {
      console.log(error);
      return;
    }
    setOrders(data);
  };
  useEffect(() => {
    if (user?.id) fetchOrders();
  }, [user]);
  return (
    <div className="mt-[60px] px-[40px]">
      <Header />
      <Table>
        <TableBody className="w-full h-full">
          {orders
            ?.sort((a: orderType, b: orderType) => {
              const dateA: any = new Date(a.ordered_at);
              const dateB: any = new Date(b.ordered_at);
              return dateB - dateA;
            })
            .map((order: orderType) => {
              return (
                <TableRow
                  key={order.id}
                  onClick={() => {
                    navigate(`/history/${order.id}`);
                  }}
                  className="hover:cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="flex flex-col gap-1">
                    <ResturantName seller_id={order.seller_id} />
                    <p className="text-sm text-gray-700">
                      {formatRelativeDate(order.ordered_at)}
                    </p>
                  </TableCell>
                  <TableCell>{order.total} MMK</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        order.status === "pending" && "bg-amber-100"
                      }`}
                      variant={
                        order.status === "pending"
                          ? "outline"
                          : order.status === "accepted"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {order?.message}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryMain;
