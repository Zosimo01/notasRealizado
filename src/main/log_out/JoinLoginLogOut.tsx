import { useContext, useState } from "react"
import { Contex } from "../contexts/AuthContex";
import { AuthDispatch_login } from "../dispatch/AuthDispatch";
import { Login } from "./Login";
import { Logout } from "./Logout";

export const JoinLoginLogOut = () => {

    const [state, setstate] = useState(true);
    const [check, setCheck] = useState({ login: '', nameStyle: 'cotainer_log_out',loading:false });
    const { dispatchLogin, dispatchToken,loading,dispatchLoading } = useContext(Contex);

    const handleLogin = () => {
        setstate(false);
        setCheck({...check, login: 'login', nameStyle: 'cotainer_log_login' });
    }

    const handleLogout = () => {
        setstate(false);
        setCheck({...check,login: 'logout', nameStyle: 'cotainer_log_login' });
    }

    const handleDemo = () => {
        // setstate(false);
        dispatchLoading(true);
        const node = document.querySelector('.joinLogin_logout') as HTMLElement;
        node.style.backgroundColor='rgba(128, 128, 128, 0.445)'
        
        AuthDispatch_login({
            email: 'demo@gmail.com',
            password: '123456', demo: 'demo'
        })
        .then(resp => {
                setTimeout(()=>{
                
                dispatchToken({
                    name: resp.nameuser,
                    ok: resp.ok,
                    uid: resp._id,
                    demo: resp.demo,
                    value: resp.value
                });
                dispatchLoading(false)
                dispatchLogin(resp.ok)
               
            },4000)
            })
            .catch(() => {
                
                dispatchToken({ name: '', ok: false, uid: '', demo: '', value: '' });
                dispatchLogin(false);
                dispatchLoading(false)
                
            })
            

    }

    return (
        <div className="joinLogin_logout" >
            <div className={check.nameStyle} >
                {
                    loading && (
                        <div className="laoding_demo">

                        <div className="laoding_inicio" >
                            <h1>
                                Cargando<span>...</span>
                            </h1>
                        </div>
                        </div>
                    )
                }
                {
                    state && (
                        <>
                            <div className="rotate_title" >
                                <div>
                                    <h1 className="title_log_out" >WRITING YOUR NOTES</h1>
                                </div>
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
                    check.login === 'login' && <Login handleLogout={handleLogout} />
                }
                {
                    check.login === 'logout' && <Logout handleLogin={handleLogin} />
                }
            </div>
        </div>
    )
}
