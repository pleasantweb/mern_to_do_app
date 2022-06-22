import '../styles/Home.scss'
import Tasks from '../components/Tasks'
import { useAppSelector } from '../reduxTool/app/hooks'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(state=>state.auth.isAuthenticated)
  return (
    <div className='home_page'>
      {isAuthenticated ? (
        <Tasks />
      ):(<div className='notAuth'>
      <h1 className='text-center'>New User</h1>
      <button onClick={()=>navigate('/auth/register')}>Sign Up</button>
      </div>)}
      
    </div>
  )
}

export default Home