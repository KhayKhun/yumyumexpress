import supabase from '@/lib/supabase';
import { useEffect, useState } from 'react'

type Props = {
    seller_id:any
}
const OrdersListCard = ({seller_id} : Props) => {
    const [sellerName,setSellerName] = useState('')
    console.log(sellerName)
    const fetchSellerName = async () => {
      const { data, error } = await supabase
        .from("sellers")
        .select("name")
        .eq("id", seller_id);
      if (error) {
        console.log(error);
        return;
      }
      if (data[0]) {
        setSellerName(data[0].name);
      }
    };
    useEffect(()=>{
        fetchSellerName();
    },[])
  return (
    <p className='font-semibold'>{sellerName}</p>
  )
}

export default OrdersListCard