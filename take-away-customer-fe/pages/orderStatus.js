import Order from "../components/Order/Confirmed";
import { useEffect,useContext,useState } from "react"
import { useRouter } from "next/dist/client/router";

const OrderStatus = ()=>{
    // const token =  useContext(AuthContext)
    // const router  = useRouter()
    // useEffect(() => {
    //     if(!token){
    //         router.push('/login')
    //     }
    // })
    return(
        <div>
           <Order/>
        </div>
    )
}

export default OrderStatus