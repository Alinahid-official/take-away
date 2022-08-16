import AuthContext from "../../stores/authContext"
import Cart from "../../components/Cart/Cart";
import { useEffect,useContext,useState } from "react"
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header/Header"
const CartDetails = ()=>{
    // const token =  useContext(AuthContext)
    // const router  = useRouter()
    // useEffect(() => {
    //     if(!token){
    //         router.push('/login')
    //     }
    // })
    return(
        <div>
            <Header/>
           <Cart/>
        </div>
    )
}

export default CartDetails