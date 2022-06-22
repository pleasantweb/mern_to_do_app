import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../reduxTool/query/authApi"


const Register = () => {
  const navigate = useNavigate()
  const [registerUser,setRegisterUser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    password:''
})
const {first_name,last_name,email,password} = registerUser

const [register,res] =useRegisterMutation()
const {isSuccess} = res

useEffect(()=>{
   if(isSuccess){
    navigate('/auth/activation')
   }
},[isSuccess,navigate])

const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
   setRegisterUser(prev=>({
       ...prev,[e.target.name]:e.target.value
   }))
}

const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  // console.log(registerUser);
  await register(registerUser)
  
  // await createUser(registerUser)
}

  return (
    <div className="container">
    <h1 className="mt-3 px-4">Sign Up</h1>
  <form  className="m-4" onSubmit={onSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputFirstName" className="form-label">
        First Name
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputFirstName"
        onChange={onChange}
        name='first_name'
        value={first_name}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputLastName" className="form-label">
        Last Name
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputLastName"
        onChange={onChange}
        name='last_name'
        value={last_name}
      />
    </div>
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
      Sign Up
    </button>
    <div className='d-flex mt-4'>
      <p>Already a User ?</p> <Link className='px-2' to='/auth/login'>Sign In</Link>
    </div>
  </form>
</div>
  )
}

export default Register