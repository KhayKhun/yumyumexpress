import { sellerType } from '@/constants/global.types'
import { Link } from 'react-router-dom'

type Props = {
    resturantData : sellerType
}

const ResturantCard = ({resturantData} : Props) => {
  return (
    <Link to={`/resturants/${resturantData.slug}`} className='border shadow-sm hover:rotate-3'>
        <img src={resturantData.image}/>
        <h1 className='text-sm sm:text-base p-2'>{resturantData.name}</h1>
    </Link>
  )
}

export default ResturantCard