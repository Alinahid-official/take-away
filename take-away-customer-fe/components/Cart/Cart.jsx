import classes from "../../styles/Cart.module.css"
import AuthContext from "../../stores/authContext"
import { useEffect,useContext,useState } from "react"
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Item from './orderItem'
import Link from 'next/link'

const Cart = ()=>{
    const [list,setList] = useState(null)
    const [price, setPrice] = useState(0)
    const token =  useContext(AuthContext)
    const router  = useRouter()
    const total= cost =>{
        setPrice(price+parseInt(cost))
    }
    useEffect(() =>{
        if(!token){
            router.push("/login")
          }
        const getCart =async ()=>{
            try {
                const res = await axios.get('http://localhost:4000/order/carts/items',{
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                // console.log(res)
                setList(res.data)
                var l = res.data
                var total = 0
                for(let i in l){
                    console.log(l[i])
                    console.log(l[i].menu.cost *l[i].quantity)
                    total = total + ( parseInt(l[i].menu.cost) * l[i].quantity)

                }
                setPrice(total)
                }
            catch(e){
                console.log(e)
            }
        }
        if(token){
            getCart()
        }
        
    },[])
    console.log('l',list)
    return(
        <div className={classes.cart}>
            <div className={classes.btn}>
            <button>Add Items</button>
            </div>
            {list? list.map(item=>{
                // eslint-disable-next-line react/jsx-key
                return( <Item token={token} item={item} total ={total}/>)
            }):null}
            <div>
            <div className={classes.total}>
                <h5>Total Amount</h5>
                <h5 className={classes.amount}>£ {price}</h5>

            </div>
            <div className={classes.btn}>
            <Link href={'/order'}><a><button>Place Order</button></a></Link>
            
            </div>
          </div>
        </div>
    )
}

export default Cart