import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";
export const useAuth=()=>{
    const context=useContext(AuthContext);
    const {user,setuser,loading,setloading}=context;
 const handleLogin=async({emial,password})=>{
    setloading(true);
  const data=  await login({email,password})
  setuser(data.user);
  setloading(false)
 }
const handleRegister=async({username,email,password})=>{
   setloading(true);
  const data=  await register({username,email,password})
  setuser(data.user);
  setloading(false);

}
const handleLogout=async()=>{
   setloading(true);
  const data=  await logout()
  setuser(null);
  setloading(false);

}

return {user,loading,handleRegister,handleLogin,handleLogout}
}