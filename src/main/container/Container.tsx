
import { MouseEvent, useContext } from "react";

import { Contex } from "../contexts/AuthContex";
import { NotesContex } from "../contexts/NoteContex";
import { ContainerBody } from "./ContainerBody";
import { ContainerList } from "./ContainerList";

interface Props{
  name:string,
  demo:string,
  ok:boolean,
  uid:string,
  value:string
}

export const Container = (data:Props) => {

  const {dispatchLogin,dispatchToken} = useContext(Contex);
  const {getDispatch_notesTextarea} = useContext(NotesContex);

  const handleLogOut =()=>{
    localStorage.removeItem('token');
    dispatchToken({name:'',ok:false,uid:'',demo:'',value:''});
    getDispatch_notesTextarea({
      _id: '',
      value: '',
      type: '',
      user: '',
      data:'',
      RowsNumb:2
    })
    dispatchLogin(false);
  } 

const handleShowItems=(e:MouseEvent)=>{
  const node = document.querySelector('#container_list') as HTMLElement;
 
  if(node.style.display==='block'){
    node.style.display ='none';
  
  }else{
    node.style.display ='block'
  
  }
}

  return (
    <div className="container" >
      <div className="container_note" >
        <div className="container_title" id="container_title">
          <button style={{
            position:'absolute',
            left:0,
            padding:'5px',
            fontSize:'20px',
            borderRadius:'10px',
            backgroundColor:'orange'
          }} onClick={handleLogOut} >log out </button>
          <h1>wrinting your notes</h1>
        </div>
        <div className="contaienr_cuerpo" >

          <ContainerList />
          <ContainerBody />
          {/* {
            notes.openModal &&
            <Modals />
          } */}
        </div>
        <div className="container_title" >
          <button className="menu_itemButtom"
          onClick={handleShowItems}
          >menu</button>
          <h1>welcomo {data.value}</h1>
        </div>
      </div>
    </div>
  )
}

