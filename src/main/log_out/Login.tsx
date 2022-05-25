import { useContext } from "react"
import { Contex } from "../contexts/AuthContex"
import { AuthDispatch_login } from "../dispatch/AuthDispatch"
import { useForm } from "../hooks/useForm";

interface Props {
  handleLogout: () => void,
}

export const Login = ({ handleLogout }: Props) => {

  const { dispatchLogin,dispatchToken } = useContext(Contex);
  const { data, handleChange } = useForm({ email: 'tobby@gmail.com', password: '123456', demo: 'guardar' });

  const handleEnter = (e: any) => {
    e.preventDefault();
      AuthDispatch_login({ ...data })
        .then(resp=>{
          dispatchToken({
            name:resp.nameuser,
            ok:resp.ok,
            uid:resp._id,
            demo:resp.demo,
            value:resp.value
          });
          dispatchLogin(resp.ok)
        })
        .catch(()=>{
         
          dispatchToken({name:'',ok:false,uid:'',demo:'',value:''});
          dispatchLogin(false);

        })
   
  }


  return (
    <form className="user_login" onSubmit={handleEnter}>
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
        
        <button> login </button>
        <p> ¿no tienes una cuenta? :
          <a href="##:login" onClick={handleLogout} > create</a>
        </p>
      </div>
    </form>
  )
}
