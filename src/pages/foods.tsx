import NavigateBar from '@/components/essentials/NavigateBar'
import Header from '../components/essentials/Header'
import FoodList from '../components/foods/FoodList'

const FoodsPage = () => {
  return (
    <div className='p-[10px] sm:px-[40px]'>
      <Header/>
      <NavigateBar links={[
        {
          display : 'Home',
          link: '/'
        }
      ]}/>
      <FoodList/>
    </div>
  )
}

export default FoodsPage