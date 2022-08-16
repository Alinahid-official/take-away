import classes from "../../styles/RestaurantProfile.module.css"
import { useEffect,useContext,useState } from "react"
import axios from 'axios'

const Item =({token,item})=>{
    const [quantity, setQuantity] = useState(0);
    const addItem = async(quant)=>{
        try{
            
            const res = await axios.post('http://localhost:4000/order/cart',{
                menu : item._id,
                quantity : quant,
                restaurant : item.restaurant
            },{
            headers:{
                "Access-Control-Allow-Origin" : "*",
                'Content-Type': 'application/json',
                'Authorization' : token
              }})
            console.log(res)

        }catch (e){
            console.log(e)
        }
        
    }
    useEffect(()=>{
        const getItem = async()=>{
            try{
                
                const res = await axios.get(`http://localhost:4000/order/cart/${item._id}`,{
                headers:{
                    "Access-Control-Allow-Origin" : "*",
                    'Content-Type': 'application/json',
                    'Authorization' : token
                  }})
                // console.log("menu",res)
                if(res.data){
                    setQuantity(res.data.quantity)
                }
                
            }catch (e){
                console.log(e)
            }
            
        }
        getItem()
    },[])
    
    return (
        <div className={classes["resto-menu"]}>
                  <div className={classes.box}>
                  <div className={classes["item-details"]}>
                          <div className={classes["item"]}>
                          <span className={classes["item-img"]}>
                            <img width="100px" src="../banner1.jpg" alt="" />
                          </span>
                          <div className={classes["item-fields"]}>
                          <span className={classes.itemName}>{item.name}</span>
                          <span className={classes.itemDesc}>{item.description}</span>
                          <span className={classes.amount}>£{item.cost}</span>
                          </div>
                          </div>
                          <div className={classes["item-quantity"]}>
                            <div className={classes["add"]}>
                              <span>
                            <h6 className={classes["item-add"]}>Add</h6>
                            </span>
                            <input value={quantity} onChange={e=>{
                                // console.log(e.target.value)
                                setQuantity(e.target.value)
                                addItem(e.target.value)
                            }} min="0" type="number" placeholder="0" />
                            </div>
                          </div>
  
  
                         </div>
  
                  </div>
  
              </div>
      )
}
export default Item