import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderType } from "@/constants/global.types";
type Props = {
  receiptData: orderType
};
const ReceiptReview = ({ receiptData }: Props) => {
  return (
    <main className="w-full h-full max-h-[70vh] overflow-auto ">
      <p className="flex border border-green-200 p-2 text-gray-600 bg-gray-50 rounded-lg">
          To: {receiptData.username} ({receiptData.address})
      </p>
      <Table className="tracking-wide mt-3">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receiptData.selected_foods?.map((food, index) => {
            return (
              <TableRow key={food.id}>
                <TableCell className="font-medium text-gray-500">
                  {index + 1}.
                </TableCell>
                <TableCell>{food.name}</TableCell>
                <TableCell>&times;{food.count}</TableCell>
                <TableCell className="text-right">
                  {food.price * food.count}{" "}
                  <span className="text-gray-500">MMK</span>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow className="border-0">
            <TableCell colSpan={2} className="text-center">
              SubTotal
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {receiptData.subTotal} <span className="text-gray-500">MMK</span>
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-green-200">
            <TableCell colSpan={2} className="text-center">
              Delivery Fee
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              {receiptData.delivery_fee}{" "}
              <span className="text-gray-500">MMK</span>
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
              {receiptData.total} <span className="text-gray-500">MMK</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
};

export default ReceiptReview;
