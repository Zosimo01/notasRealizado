import { useContext, useEffect, useRef, useState } from "react"
import { Container } from "./container/Container";
import { Contex } from "./contexts/AuthContex"
import {  AuthDispatch_token } from "./dispatch/AuthDispatch";
import { JoinLoginLogOut } from "./log_out/JoinLoginLogOut"
interface Props{
  name:string,
  demo:string,
  ok:boolean,
  uid:string,
  value:string
}
export const Main = () => {
  const token = localStorage.getItem('token');
  const control = useRef(false);

  const { login,dispatchToken } = useContext(Contex);
  const [check, setcheck] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState<Props> ({
    name:'',
    ok:false,
    uid:'',
    demo:'',
    value:''
  })

  
  useEffect(() => {

    AuthDispatch_token(token)
      .then(resp => {
        delete resp.smg;
        setdata(resp)
        
        setcheck(resp.ok);
        setloading(true);
        control.current=resp.ok;
      })
      .catch(() => {
        setcheck(false)
        setloading(true)});

  }, [login,token]);

  useEffect(() => {
    
    if(!control.current) return
    dispatchToken(data);
    control.current=false
  
  }, [data,dispatchToken])
  


  if (!loading) {
    return (
      <h1> loading </h1>
    )
  }

  return (
    <>
    <div id="add_data_toke_user"/>
      {
        !check
          ? <JoinLoginLogOut />
          : <Container {...data} />
      }
    </>
  )
}


