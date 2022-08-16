import classes from "../../styles/Order.module.css"
import axios from "axios";
import { useEffect,useContext, useState } from "react";
import AuthContext from "../../stores/authContext"

const Order = ()=>{

    const [list, setList] = useState(null)
    const [users, setUsers] = useState(null)
    // const [total, setTotal] = useState(null)
    const token = useContext(AuthContext)
    const acceptOrder = async(user,token) =>{
        try{
            const res = await axios.get(`http://localhost:4000/order/accept/processing/${user}`,{
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                console.log(res)
                getOrders()
        }catch(e){
            console.log(e)
        }
    }
    const declineOrder = async(user,token) =>{
        try{
            const res = await axios.get(`http://localhost:4000/order/decline/processing/${user}`,{
                    headers: {
                        "Access-Control-Allow-Origin" : "*",
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                getOrders()
                console.log(res)
        }catch(e){
            console.log(e)
        }
    }
    const extractUser =list=>{
        var temp =[]
        list.map(item=>{
            var user = item.customer._id
            if(!temp.includes(user)){
                temp.push(user)
            }
        })
        setUsers(temp)
    }
    const getOrders =async ()=>{
        try {
            console.log('getOrders')
            const res = await axios.get('http://localhost:4000/order/owners/processing',{
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    'Content-Type': 'application/json',
                    'Authorization' : token
                }
            })
            // console.log(res)
            setList(res.data)
            extractUser(res.data)
            // var l = res.data
            // var totals = 0
            // for(let i in l){

            //     totals = totals +  (parseInt(l[i].item.menu.cost )* l[i].item.quantity)
                
            // }
            
            // setTotal(totals)
            }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() =>{
        console.log(token)
        // if(!token){
        //     router.push("/login")
        //   }
        getOrders()
        
    },[])
    console.log(users)
    return (
        <div className={classes.order}>
            <h1>Orders</h1>
            {users?users.map(user=>{
                var orders = list.filter(item=>{
                    return item.customer._id == user
                })
                var total = 0
                var items = 0
                for(let i in orders){
                    total = total +  (parseInt(orders[i].item.cost )* orders[i].quantity)
                    items = items + orders[i].quantity
                }
                return (
                    <div key={user._id} className={classes.box}>
                    <div className={classes.flex}>
                        <h3>{orders[0].customer.name}</h3>
                        <h5>Order amount: <span className={classes.color}>£{total}</span></h5>
    
                    </div>
    
                   <div className={classes.second}>
                    <div className={classes.flex}>
                        <h5>No.of items:{items}</h5>
                        <h5>Time: 30min</h5>
                    </div>
                    </div>
    
                    
                    <div className={classes.flex}>
                        <div className={classes["menu-btn"]}>
                        <button>See Menu</button>
                        </div>
                       <div className={classes["acc-dec-btn"]}>
                        <button onClick = {e=>{
                            e.preventDefault();
                            acceptOrder(user,token)
                            }}>Accept</button>
                        <button onClick={e=>{
                            e.preventDefault();
                            declineOrder(user,token) 
                        }}>Decline</button>
                       </div>
                    </div>
    
                </div>
                    )
            }):null}


            {/* <div className={classes.box}>
                <div className={classes.flex}>
                    <h3>John Smith</h3>
                    <h5>Order amount: <span className={classes.color}>£36</span></h5>

                </div>

               <div className={classes.second}>
                <div className={classes.flex}>
                    <h5>No.of items:5</h5>
                    <h5>Time: 30min</h5>
                </div>
                </div>

                
                <div className={classes.flex}>
                    <div className={classes["menu-btn"]}>
                    <button>See Menu</button>
                    </div>
                   <div className={classes["acc-dec-btn"]}>
                    <button>Accept</button>
                    <button>Decline</button>
                   </div>
                </div>

            </div> */}

        </div>
    )
}


export default Order