import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "../../styles/Order.module.css"
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { useEffect,useContext, useState } from "react";
import AuthContext from "../../stores/authContext"

const ProcessingOrders = ()=>{
    const [list, setList] = useState(null)
    const [users, setUsers] = useState(null)
    // const [total, setTotal] = useState(null)
    const token = useContext(AuthContext)
    const completeOrder = async(user,token) =>{
        try{
            const res = await axios.get(`http://localhost:4000/order/complete/accepted/${user}`,{
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
            const res = await axios.get('http://localhost:4000/order/owners/accepted',{
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
    console.log(users,list)
    return (

        <div className={classes.order}>
            <h1>Processing Orders</h1>
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
                    <div className={classes.box}>
                    <div className={classes.flex}>
                        <h3>{orders[0].customer.name}</h3>
                        <h5>Order amount: <span className={classes.color}>£{total}</span></h5>
    
                    </div>
    
                   <div className={classes.second}>
                    <div className={classes.flex}>
                        <h5>No.of items:{items}</h5>
                        <h5>Time Left: 30min</h5>
                    </div>
                    </div>
    
                    <div className={classes.pro}>
                         <h5>The order is in processing <span><FontAwesomeIcon icon={faClockRotateLeft} /></span></h5>
                    </div>
                  
                    <div className={classes["acc-dec-btn"]}>
                        <button onClick = {e=>{
                            e.preventDefault();
                            completeOrder(user,token)}}>setComplete</button>
    
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
                    <h5>Time Left: 30min</h5>
                </div>
                </div>

                <div className={classes.pro}>
                     <h5>The order is in processing <span><FontAwesomeIcon icon={faClockRotateLeft} /></span></h5>
                </div>
              

            </div> */}
{/* 
            <div className={classes.box}>
                <div className={classes.flex}>
                    <h3>John Smith</h3>
                    <h5>Order amount: <span className={classes.color}>£36</span></h5>

                </div>

               <div className={classes.second}>
                <div className={classes.flex}>
                    <h5>No.of items:5</h5>
                    <h5>Time Left: 30min</h5>
                </div>
                </div>

                
                <div className={classes.pro}>
                     <h5>The order is in processing <span><FontAwesomeIcon icon={faClockRotateLeft} /></span></h5>
                </div>

            </div> */}

        </div>
    )
}


export default ProcessingOrders