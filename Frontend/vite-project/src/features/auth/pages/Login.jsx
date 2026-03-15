import { Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
const Login = () => {
   const {loading,handleLogin}=useAuth()
const [email, setemail] = useState("")
 const [password, setpassword] = useState("")
const  handleSubmit=async (e)=>{
  e.preventDefault();
  handleLogin({email,password})
}
if(loading){
  return (<main><h1>Loading......</h1></main>)
}


  return (
    <main>
      <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-grp'>
          <label htmlFor='email'>Email</label>
          <input 
          onChange={(e)=>{setemail(e.target.value)}}
           type='email' id='email' name='email' placeholder='enter email...' ></input>
        </div>
        <div className='input-grp'>
          <label htmlFor='password'>Password</label>
          <input 
          onChange={(e)=>{setemail(e.target.value)}}
          type='password' id='password' name='password' placeholder='enter password...' ></input>
        </div>
          <button className='button'>Login</button>
      </form>

<p>Dont have an Account?<Link to={"/register"}>Register</Link></p>

      </div>
    </main>
  )
}

export default Login
