import { FormEvent, useContext } from "react"
import { Contex } from "../contexts/AuthContex"
import { AuthDispatch_crate } from "../dispatch/AuthDispatch"
import { useForm } from "../hooks/useForm"

interface Props{
    handleLogin:()=>void,
}

export const Logout = ({handleLogin}:Props) => {

  const {data,handleChange} =  useForm({name:'',email:'',password:'',demo:'demo'})

   const {dispatchLogin} =  useContext(Contex);


    const handleEnter=async(e:FormEvent)=>{
        e.preventDefault();
        const resp =  await AuthDispatch_crate({...data});
        dispatchLogin(resp.ok);
    }

    return (
        <form className="user_login" onSubmit={handleEnter} >
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name"
                onChange={handleChange}
                value={data.name}
            />
            <label htmlFor="email">email: </label>
            <input type="email" name="email" id="email" 
                onChange={handleChange}
                value={data.email}
            />
            <label htmlFor="password">password: </label>
            <input type="text" name="password" id="password"
                onChange={handleChange}
                value={data.password}
            />
            <div className="user_botton" >
            
            <button> create </button>
                <p> ¿ya tengo una cuenta? :
                    <a href="##:create" onClick={handleLogin} >  login</a>
                </p>
            </div>
        </form>
    )
}
