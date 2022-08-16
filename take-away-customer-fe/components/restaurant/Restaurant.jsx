import { useEffect,useContext,useState } from "react"
import AuthContext from "../../stores/authContext"
import { useRouter } from "next/dist/client/router";
import classes from "../../styles/Restaurant.module.css"
import Rating from "@mui/material/Rating";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import axios from "axios";
import Link from 'next/link'
import { faL } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Icon from '../Cart/cartIcon'


const Restaurant = ()=>{
    const token = useContext(AuthContext)
    const router  = useRouter()
    const [value, setValue] = useState(4);
    const [list , setList] = useState(null)
    const [loading,setLoading] = useState(false)
    const [filteredList,setFilteredList] = useState(null)
    const [search,setSearch]  = useState("")
    const [open, setOpen] = useState(false);
// console.log("s",search.toLowerCase());

const handleClose = () => {
  setOpen(false);
};

const handleToggle = () => {
  setOpen(!open);
};

    const logout=()=>{
        console.log('click')
        // window.localStorage.removeItem('user')
        window.localStorage.removeItem('userToken')
        router.reload()
    }
    useEffect(()=>{
        if(token){
            router.push("/restaurant")
          }else{
            router.push("/login")
          }
        const getRes = async ()=>{
        
          try { setLoading(false)
                const res = await axios.get('http://localhost:4000/restaurant/restaurants')
                if(res){
                  setList(res.data)
                  setFilteredList(res.data)
                  setLoading(true)
                }else{
                  setLoading(false)
                }
                
                
                }
          catch (e){
            setLoading(false)
            console.log(e)
          }
        }
        getRes()

    },[])

   

    const filter = (search)=>{
      // console.log(list)
      // console.log("s",search)
      if(search != ""){
    console.log("search",search)
        const newList = list.filter((l)=>{
          setLoading(false)
          console.log("o",Object.values(l).join(" ").toLowerCase())
          return Object.values(l).join(" ").toLowerCase().includes(search)
        })
        // console.log("n",newList)
        setFilteredList(newList)
        setLoading(true)
      }else{
        setFilteredList(list)
        setLoading(true)
        setList(list)
      }
    }
    if(!loading){
      return(
<Backdrop
    sx={{ color: '#fff' }}
    open
    onClick={handleClose}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
      )
    }else{
      return(
        <div className={classes["landing-page"]}>
         
        <div className={classes.banner}>

            <div className={classes.header}>
            <div className={classes.orders} >
                <Link href={'/orderStatus'}><a>Orders</a></Link>
                </div>
                <div className={classes.logout} >
                  <Icon/>
                <button onClick={logout}>Logout</button>
               
                </div>
              
                {/* <div className={classes.logout} >
                <Link href={'/cart'}><a>cart</a></Link>

                </div> */}
                

                </div>
                <div className={classes.container}>
            <h1 >Foodie Hunter</h1>
            <p>Delicious food for you</p>
            <div className={classes.search}>
            
                    <input onChange={e=>{
                      filter(e.target.value)
                      }} type="text" name="names" list="names" placeholder="Search for restaurant" autoComplete="off"/>
                    <datalist  id="names">
                      <option >leicester</option>
                      <option >london</option>
                      <option >birmingham</option>

                    </datalist>
                  
                </div>
            </div>
               

            </div>
            
            
        {/* </div> */}
        <div className={classes["top-resto"]}>
                <h1> Restaurants</h1>
                <div className={classes.grid}>
                  {filteredList?filteredList.map(res=>{return(
                                        <Link key={res._id} href={`/restaurant/${res.owner}`}>
                                        <a>
                                        <div className={classes.card}>
                                        <div className={classes["item-details"]}>
                                            <div className={classes["item"]}>
                                            <span className={classes["item-img"]}>
                                              <img src="../resto-pic.png" alt="" width="200px" />
                                            </span>
                                            <div className={classes["item-fields"]}>
                                            <span className={classes.itemName}>{res.name}</span>
                                            <span className={classes.rating}>4.5
                                            <Rating className={classes["rating-comp"]} name="read-only" value={value} readOnly />
                                            </span>
                                            <div className={classes.flex}>
                                            <span className={classes.opened}>Opened</span>
                                            <span className={classes.distance}>3km</span>
                                            </div>
                                            </div>
                                            </div>

                                          
                    
                                           </div>
                    
                                        </div>
                                        </a>
                                        
                                        </Link>
)
                  }):null}


                </div>
            </div>
        </div>
    )
    }

    
}

export default Restaurant