import { useState, createContext } from 'react'

export const AuthContext=createContext();

export const AuthProvider=({Children})=>{
    const [user,setuser]=useState(null);
   const [loading, setloading] = useState(false);

   return (
    <AuthContext.Provider Value={{user,setuser,loading,setloading}}>
    {Children}
    </AuthContext.Provider>
   )

}