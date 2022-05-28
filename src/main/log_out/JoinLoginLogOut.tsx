import { useContext, useState } from "react"
import { Contex } from "../contexts/AuthContex";
import { AuthDispatch_login } from "../dispatch/AuthDispatch";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const JoinLoginLogOut = () => {

    const [state, setstate] = useState(true);
    const [check, setCheck] = useState({ login: '',nameStyle:'cotainer_log_out' });
    const { dispatchLogin,dispatchToken } = useContext(Contex);

    const handleLogin = () => {
        setstate(false);
        setCheck({login: 'login',nameStyle:'cotainer_log_login' });
    }

    const handleLogout = () => {
        setstate(false);
        setCheck({ login: 'logout',nameStyle:'cotainer_log_login' });
    }

    const handleDemo = () => {
        // setstate(false);
      AuthDispatch_login( { 
          email: 'demo@gmail.com', 
          password: '123456', demo:'demo' })
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
        <div className="joinLogin_logout" >
            <div className={check.nameStyle} >
              {
                state && (
                <>
                    <div className="rotate_title" >
                        <h1 className="title_log_out" >WRITING YOUR NOTES</h1>
                    </div>
                    <div className="container_button" >

                        <div className="login"
                            onClick={handleLogin}
                        >
                            <p>iniciar session</p>
                        </div>
                        <div className="logout"
                            onClick={handleLogout}
                        >
                            <p>crear una cuenta</p>
                        </div>
                        <div className="logout"
                            onClick={handleDemo}
                        >
                            <p>Demo</p>
                        </div>
                    </div>
                </>
                )  
              }

              {
                  check.login==='login' && <Login  handleLogout={handleLogout} /> 
              }
              {
                  check.login==='logout' && <Logout handleLogin={handleLogin} />
              }

            </div>
        </div>
    )
}
