import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../reduxTool/app/hooks'
import { logoutUserAsync } from '../reduxTool/features/auth/authAsync'


const Navbar = () => {
  const navigate= useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state=>state.auth.user)
  const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)
  return (
    <nav>
      {user !== '' ? 
      <p style={{fontSize:'1.2rem'}} className='text-capitalize'>{user}</p> 
      : <p style={{fontSize:'1.2rem'}}>Guest</p>
  }
        <Link to='/'><h1>To Do List</h1></Link>
       {isAuthenticated ? (
        <button onClick={()=>dispatch(logoutUserAsync())}>LogOut</button>
       ):(
     <button onClick={()=>navigate('/auth/login')}>Sign In</button>
       )}
       
    </nav>
  )
}

export default Navbar