import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { orderType } from "@/constants/global.types";
import { formatRelativeDate } from "@/constants/functions";
import { useAuthStore } from "@/states/authState";
import ErrorPage from "../essentials/ErrorPage";
import NavigateBar from "../essentials/NavigateBar";
const SingleOrder = () => {
  const [items, setItems] = useState<any[]>([]);
  const [order, setOrder] = useState<orderType | null>(null);
  const [error, setError] = useState(false);
  const {orderId} = useParams();
    const user = useAuthStore((state:any) => state.user);
  const fetchOrder = async () => {
    let { data, error } = await supabase
      .from("orders")
      .select("*, profiles:customer_id(id,full_name)") // This line performs the join
      .eq("id", Number(orderId));

    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      if (data[0]?.customer_id == user.id) {
        setError(false);
        setOrder(data[0]);
      } else {
        console.log('not user')
        setError(true);
      }
    }
  };
  const fetchOrderItems = async () => {
    let { data, error } = await supabase
      .from("order_items")
      .select("*, product:product_id(*)") // This line performs the join
      .eq("order_id", Number(orderId));

    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      setItems(data);
    }
  };

  useEffect(() => {
    if(user?.id){
        fetchOrder();
        fetchOrderItems();
    }
  }, [user]);

  function findSubTotal(arr: any[]) {
    let st = 0;
    arr.map((item) => {
      st += item.total_price;
    });
    return st;
  }
  return (
    <>
      {!error && Number(orderId) ? (
        <main className="w-full h-full max-h-[70vh] flex flex-col gap-2 pt-2 mb-4">
          <NavigateBar
            links={[
              {
                display: "Home",
                link: "/",
              },
              {
                display: "History",
                link: "/history",
              },
              {
                display: order?.id?.toString() || '' ,
                link: "/history/"+ order?.id,
              },
            ]}
          />
          <hr />
          <div className="text-gray-700 text-[13px]">
            <p className="">Name: {order?.profiles.full_name}</p>
            <p className="">Address: {order?.address}</p>
            {order?.customer_message && (
              <p className="">Message: {order.customer_message}</p>
            )}
            <p className="">
              Ordered time:{" "}
              {order?.ordered_at && formatRelativeDate(order.ordered_at)}
            </p>
            <p className="">
              Resturant responsed time:{" "}
              {order?.responsed_at && formatRelativeDate(order.responsed_at)}
            </p>
          </div>
          <hr />
          <ul className="grid grid-cols-4 gap-2">
            {items?.map((item) => {
              return (
                <li key={item.id}>
                  <div className="w-[60px] h-[60px] relative ">
                    <img
                      src={item.product.image}
                      className="w-full h-full rounded-lg object-cover"
                    />
                    <Badge
                      variant={"destructive"}
                      className="absolute bottom-0 right-0"
                    >
                      &times;{item.quantity}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border">
            <Table>
              <TableBody>
                {items?.map((item, index) => {
                  return (
                    <TableRow key={item.product.id}>
                      <TableCell className="font-medium text-gray-500">
                        {index + 1}.
                      </TableCell>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>&times;{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {item.total_price}
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow className="border-0">
                  <TableCell colSpan={2} className="text-center">
                    SubTotal
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {items && findSubTotal(items)}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-green-200">
                  <TableCell colSpan={2} className="text-center">
                    Delivery Fee
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {order?.delivery_fee}
                  </TableCell>
                </TableRow>
                <TableRow className=" ">
                  <TableCell
                    colSpan={2}
                    className="text-center font-semibold text-[18px]"
                  >
                    Total
                  </TableCell>
                  <TableCell colSpan={2} className="text-right font-semibold">
                    {order?.delivery_fee &&
                      findSubTotal(items) &&
                      order?.delivery_fee + findSubTotal(items)}
                    <span className="text-gray-500"> MMK</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div
            className={`w-full flex justify-center items-center border-2 p-4 rounded-l border-dashed ${
              order?.status === "accepted"
                ? "border-primary-green bg-green-50"
                : order?.status === "rejected"
                ? "border-red-500 bg-red-50"
                : "border-amber-500 bg-amber-50"
            }`}
          >
            {order?.status === "accepted"
              ? "Accepted"
              : order?.status === "rejected"
              ? `Rejected (${order?.message})`
              : "Pending"}
          </div>
        </main>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default SingleOrder;
