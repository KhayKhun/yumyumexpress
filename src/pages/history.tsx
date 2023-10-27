import Header from "@/components/essentials/Header"
import HistoryMain from "@/components/orders/HistoryMain"
import SingleOrder from "@/components/orders/SingleOrder"
import { Routes,Route } from "react-router-dom"
const HistoryPage = () => {
  return (
    <main className="px-[60px]">
    <Header/>
    <Routes>
    <Route path="/" index element={<HistoryMain/>}/>
    <Route path="/:orderId" index element={<SingleOrder/>}/>
    </Routes>
    </main>
  )
}

export default HistoryPage