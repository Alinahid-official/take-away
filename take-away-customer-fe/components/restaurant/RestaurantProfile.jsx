import classes from "../../styles/RestaurantProfile.module.css"
import CarouselContainer from "../carousel/Carousel"
import AuthContext from "../../stores/authContext"
import { useEffect,useContext,useState } from "react"
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import Item from './item'

const RestaurantProfile  = ({ownerId})=>{
  console.log("id",ownerId)
    const [menu, setMenu] = useState(null)
    const token = useContext(AuthContext)
    // console.log(token)
    const router  = useRouter()
    const logout=()=>{
        console.log('click')
        // window.localStorage.removeItem('user')
        window.localStorage.removeItem('userToken')
        router.reload()
    }

    useEffect(()=>{
        if(!token){
            router.push("/login")
          }
        const getMenu = async ()=>{
          try{
            const res = await axios.get(`http://localhost:4000/menu/${ownerId}`)
            
            setMenu(res.data)
          }catch(e){
            console.log(e)
          }
        }
        getMenu()

    },[])
    console.log("menu",menu)
    return(
        <div className={classes["resto-profile"]}>
            {/* <div className={classes.header}>
                <h1>Foodie Hunter</h1>
                <div className={classes["header-flex"]}>
                    <h2>Kavya</h2>
                    <button type="button" onClick={logout}>Logout</button>
                </div>
            </div> */}
            <div>
                <CarouselContainer/>
            </div>
            {menu?menu.map(item=>{
                return(
                  // eslint-disable-next-line react/jsx-key
                  <Item token={token} item={item}/>
                )
            }):null}
            

        </div>
    )
}

export default RestaurantProfile