import classes from "../../styles/Cart.module.css"
import { useEffect,useContext,useState } from "react"
import axios from 'axios'
import Link from 'next/link'
const Icon =()=>{
    const [quantity, setQuantity] = useState(0);


    useEffect(()=>{
        const getItem = async()=>{
            try{
                
                const res = await axios.get('http://localhost:4000/order/carts/items',{
                headers:{
                    "Access-Control-Allow-Origin" : "*",
                    'Content-Type': 'application/json',
                    'Authorization' : window.localStorage.getItem('userToken')
                  }})
                console.log(res)
                if(res.data){
                    setQuantity(res.data.length)
                }
                
            }catch (e){
                console.log(e)
            }
            
        }
        getItem()
    },[])
    
    return (
        <>
        <Link href={'/cart'}>
            <a>Cart({quantity}) </a>
                   
        </Link>
        </>
        
      
      )
}
export default Icon