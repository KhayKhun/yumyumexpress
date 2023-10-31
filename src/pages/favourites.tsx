import Header from '@/components/essentials/Header'
import ResturantCard from '@/components/favourites/ResturantCard'
import { sellerType } from '@/constants/global.types'
import supabase from '@/lib/supabase'
import { useAuthStore } from '@/states/authState'
import { useEffect, useState } from 'react'

const Favoutites = () => {
    const user = useAuthStore((state:any) => state.user);
    const [favourites,setFavourites] = useState<sellerType[]>([])
    async function fetchFavorites(){
        const {data,error} = await supabase
        .from('favourites')
        .select('sellers(*)')
        .eq('customer_id',user.id)

        if(error) {
            console.log(error);
            return;
        }
        const list = data?.map((d:any )=> {
            return d.sellers
        })
        setFavourites(list)
    }

    useEffect(()=>{
        if(user?.id) fetchFavorites();
    },[user])
  return (
    <div className="mt-[40px] md:mt-[60px] px-[10px] sm:px-[20px] md:px-[40px]">
      <Header />
      <h1 className='font-semibold my-3'>My Favourites</h1>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 ">
        {favourites?.map((f) => {
          return <ResturantCard key={f.id} resturantData={f} />;
        })}
      </ul>
    </div>
  );
}

export default Favoutites