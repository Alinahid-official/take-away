import classes from "../../styles/Confirmed.module.css"

import * as Yup from "yup"
import { useEffect,useContext,useState } from "react"
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import AuthContext from "../../stores/authContext"
const Confirmed = ()=>{
    const [list, setList] = useState(null)
    const [total, setTotal] = useState(null)
    const token = useContext(AuthContext)
    useEffect(() =>{
        // if(!token){
        //     router.push("/login")
        //   }
        const getOrders =async ()=>{
            try {
                const res = await axios.get('http://localhost:4000/order/customerOrders',{
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                console.log(res)
                setList(res.data)
                var l = res.data
                var totals = 0
                for(let i in l){
                    console.log(totals)
                    console.log(typeof(l[i].item.cost),typeof(l[i].item.quantity))
                    totals = totals +  (parseInt(l[i].item.cost )* l[i].quantity)
                    
                }
                
                setTotal(totals)
                }
            catch(e){
                console.log(e)
            }
        }
        getOrders()
        
    },[])
    return(
        <div className={classes.confirmed}>
            <h2>Your Orders</h2>
            <h2>Your Order Details:</h2>
            {list? list.map(item=>{
                return(
                    <div key={item._id} className={classes.resto}>
                    <h3>{item.restaurant.name}</h3>
                    <h3 className={classes.time}>Time to pick food:30min</h3>
                    <p>{item.item.name}</p>
                    <p>quantity : {item.quantity}</p>
                    <p>£{parseInt(item.item.cost) * item.quantity}</p>
                    <p>status : {item.status}</p>
                </div>
                )
            }):null}

                <div className={classes.cancel}>
                    <h2>Total Amount: <span style={{color:"#6D0F0F"}}> £ {total}</span></h2>
                    <button>Cancel Order</button>

                </div>
               


            

        </div>
    )

}

export default Confirmed