
import { MouseEvent, useContext } from "react";
import { animationFunction } from "../../animation/animation";

import { Contex } from "../contexts/AuthContex";
import { NotesContex } from "../contexts/NoteContex";
import { getValueAllStyle } from "../helpers/getValueAll";
import { ContainerBody } from "./ContainerBody";
import { ContainerList } from "./ContainerList";

interface Props {
  name: string,
  demo: string,
  ok: boolean,
  uid: string,
  value: string
}

export const Container = (data: Props) => {

  const { dispatchLogin, dispatchToken,dispatchLoading } = useContext(Contex);
  const { getDispatch_notesTextarea } = useContext(NotesContex);

  const handleLogOut = () => {
    dispatchLoading(true)
    setTimeout(()=>{
      dispatchLoading(false)
      localStorage.removeItem('token');
      dispatchToken({ name: '', ok: false, uid: '', demo: '', value: '' });
      getDispatch_notesTextarea({
        _id: '',
        value: '',
        type: '',
        user: '',
        data: '',
        RowsNumb: 2,
        name:''
      })
      dispatchLogin(false);
    },3000)
  }

  const handleShowItems = (e: MouseEvent) => {
    const node = document.querySelector('#container_list') as HTMLElement;
    const display = getValueAllStyle(node,'display');
    const {elementValue} = getValueAllStyle(node,'width');

    const data:any = {
      node,
       options:{duration:500},
  
    }
    if (display.elementValue === 'none') {
      node.style.display = 'block';
      const animation =[
        {position:'absolute',zIndex:'100',height:'100%', left:`-${elementValue}`},
        {position:'absolute',zIndex:'100',height:'100%',left:'0'}
      ]
      data.animation=animation;
     animationFunction(data)

    } else {
      const animation =[
        {position:'absolute',zIndex:'100',height:'100%', left:'0'},
        {position:'absolute',zIndex:'100',height:'100%',left:`-${elementValue}`}
      ]
      data.animation=animation;

     const finish = animationFunction(data)
     finish.then(()=>{
       node.style.display = 'none';
    })
    }
  }

  return (
    <div className="container" >
      <div className="container_note" >
        <div className="container_title" id="container_title">
          <div className="log_and_menu" >

          <button className="menu_itemButtom"
            onClick={handleShowItems}
            ><img src="img/menugreen.png" alt="menu" /></button>
          <button onClick={handleLogOut} >log out </button>

            </div>
          <h1>{data.value}</h1>
        </div>
        <div className="contaienr_cuerpo" >


          <ContainerList />
          <div className="risize_container" >
            <img src="img/flechahorizontal.png" alt="flecha" />
            {/* <p>{'<-->'}</p> */}
            </div>

          <ContainerBody />
          

        </div>
        <div className="container_title01" >
          <h1>writing your note!</h1>
        </div>
      </div>
    </div>
  )
}

