import classes from "../../styles/Header.module.css"
import AuthContext from "../../stores/authContext"
import { useEffect,useContext,useState } from "react"
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import Icon from '../Cart/cartIcon'
const Header = ()=>{

    const token = useContext(AuthContext)
    // console.log(token)
    const router  = useRouter()
    const logout=()=>{
        console.log('click')
        // window.localStorage.removeItem('user')
        window.localStorage.removeItem('userToken')
        router.reload()
    }
    return(
        <div>
            <div className={classes.header}>
                <h1>Foodie Hunter</h1>
               
                <div className={classes["header-flex"]}>
                    <h2>Kavya</h2>
                    <div className={classes.cart} >
                {/* <Link href={'/cart'}>
                    <a>Cart 
                         </a>
                   
                    </Link> */}
                    <Icon/>
                   {/* <div className={classes["cart-icon"]}>
                  
                   <FontAwesomeIcon className={classes.icon} icon={faCartShopping} />
                   <span className={classes.items}>3</span>
                   
                   </div> */}

                </div>
                    <button type="button" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Header