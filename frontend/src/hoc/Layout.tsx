import { useEffect } from "react"
import { Outlet} from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAppDispatch, useAppSelector } from "../reduxTool/app/hooks"
import { refreshUserAsync, verifyAsync } from "../reduxTool/features/auth/authAsync"
import '../styles/blog.scss'

const Layout = () => {

  
 const dispatch = useAppDispatch()
 const accessToken = useAppSelector(state=>state.auth.accessToken)
 const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)

  useEffect(()=>{
      if(!isAuthenticated){
        dispatch(refreshUserAsync())
      }
  },[isAuthenticated,dispatch])
  
  useEffect(()=>{
    if(!isAuthenticated){
      if(accessToken !== ''){
        dispatch(verifyAsync(accessToken))
      }
    }
  },[isAuthenticated,accessToken,dispatch])
 

  return (
    <div className="site_container">
       <Navbar />
          <Outlet />

         
    </div>
  )
}

export default Layout