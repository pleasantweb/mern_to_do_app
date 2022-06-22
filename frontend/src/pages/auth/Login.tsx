import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../reduxTool/app/hooks'
import { loginAsync } from '../../reduxTool/features/auth/authAsync'


const Login = () => {
  const navigate = useNavigate()
  const [loginData,setLoginData] = useState({
      email:'',
      password:''
  })
  const {email,password} = loginData

  const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     setLoginData(prev=>({
         ...prev,[e.target.name]:e.target.value
     }))
  }

//////////////////////////////////////////////////////////////////////

const dispatch = useAppDispatch()


///////////////////////////////////////////////////////////////////////////
const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
 
  const result = await dispatch(loginAsync(loginData))

 
  if(result.meta.requestStatus === 'fulfilled'){
    navigate('/')
    
  }

}

  return (
    <div className='container'>
    <h1 className="mt-5 px-4">Sign In</h1>
  <form className="m-4" onSubmit={onSubmit}>
  <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleInputEmail1"
        onChange={onChange}
        name='email'
        value={email}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="exampleInputPassword1"
        onChange={onChange}
        name='password'
        value={password}
      />
    </div>
    
    <button type="submit" className="btn btn-primary">
      Sign In
    </button>
    <div className='d-flex mt-4'>
      <p>Not a User ?</p> <Link className='px-2' to='/auth/register'>Register</Link>
    </div>
  </form>
</div>
  )
}

export default Login