import { createContext, useReducer, useState } from "react"
import { AuthReducer } from "../../reducers/AuthReducer"


export interface AuthLoginProps{
    ok:boolean,
    name:string,
    uid:string,
    demo:string,
    value:string,
}

 interface AuthContexProps{
    login:boolean,
    loading:boolean,
    authLogin:AuthLoginProps,
    dispatchLogin:(login:boolean)=>void,
    dispatchToken : (payload:AuthLoginProps)=>void,
    dispatchLoading:(loading:boolean)=>void
}

const initState:AuthLoginProps={
    ok:false,
    name:'',
    uid:'',
    demo:'',
    value:''
}

 export const Contex = createContext({} as AuthContexProps );

export const AuthProvider = ({children}:any) => {

    
    const [state, dispatch] = useReducer(AuthReducer, initState);
    const [login, settoken] = useState(false);
    const [loading, setloading] = useState(false);



    const dispatchLogin=(login:any)=>{
        // dispatch(
        //     {type:'enter',
        //     payload})
        settoken(login);
    }

    const dispatchToken = (payload:AuthLoginProps)=>{
        dispatch({
            type:'token',payload
        })
    }

const dispatchLoading=(loading:boolean)=>{
    setloading(loading)
}

  return (
    <Contex.Provider 
        value={
            {
                login,
                authLogin:state ,
                dispatchLogin,
                dispatchToken,
                loading,
                dispatchLoading
            }
        }
    >
        {children}
    </Contex.Provider >
  )
}

