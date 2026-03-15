import React from 'react'
import { useNavigate,Link } from 'react-router';
const Register = () => {
const navigate=useNavigate();

  const handleSubmit=(e)=>{
  e.preventDefault();
}
  return (
    <main>
      <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <div className='input-grp'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' placeholder='enter your name here...' ></input>
        </div>
        <div className='input-grp'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' placeholder='enter email...' ></input>
        </div>
        <div className='input-grp'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' placeholder='enter password...' ></input>
        </div>
          <button className='button'>Register</button>
      </form>

<p>Already have an Account?<Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
