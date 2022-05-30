
import { CreateInputAdd } from "../components/CreateInputAdd";
import { DispatchItems_remove, DispatchItems_renombrar } from "../dispatch/DispatchNotes";
import { removeItemsAndOcult } from "./AnimationLoading";

export type TypesItemMenu =
  | 'file'
  | 'folder'
  | 'renombrar'
  | 'copiar'
  | 'eliminar'

interface Props {
  action:TypesItemMenu,
  htmlElement_id:string,
  getDispatch_uidDelete:(payload:[])=>void,
  dispatchLoading_false:()=>void,
  demo:string
}


export const ItemsMenuClick = ({action,htmlElement_id,getDispatch_uidDelete,dispatchLoading_false,demo}:Props) => {
  switch (action) {
    case 'file':

     const resp01 = InputAdd_FILE_FOLDER(htmlElement_id);
    const resp1={
      ...resp01,
      name:'file'
    }
    return resp1;
    case 'folder':
    const resp02 =  InputAdd_FILE_FOLDER(htmlElement_id);
    const resp2={
      ...resp02,
      name:'folder'
    }
      return resp2;
    case 'eliminar':
     const resp3= DeleteItems(htmlElement_id,getDispatch_uidDelete,dispatchLoading_false,demo);
    const resp03={
      ...resp3,
      name:'eliminar'
    }

      return resp03;
    case 'renombrar':
    const resp4 = RenombrarItems(htmlElement_id,demo);
    const resp05={
      ...resp4,
      name:'renombrar'
    }
      return resp05;

  }
}

export const InputAdd_FILE_FOLDER = (htmlElement_id: string) => {
  
  const { input_id, submit_id } = CreateInputAdd(htmlElement_id)
  const element = document.getElementById(input_id) as HTMLElement;
  element.focus();
  element.onblur = function () {
    element.remove()
    const submit = document.getElementById(submit_id) as HTMLInputElement;
    submit.remove()
  }
  // element.blur();
  return { element:element, parentNode: element.parentNode, smg:'add'};
}

// ELIMINAR ITEMS
export const DeleteItems = (htmlElement_id:string,getDispatch_uidDelete:(payload:[])=>void,dispatchLoading_false:()=>void,demo:string)=> {

  const element = document.getElementById(htmlElement_id) as HTMLElement;
  const nodes = element.parentNode as HTMLElement;
const token =localStorage.getItem('token');
removeItemsAndOcult(nodes,'none','none');
 DispatchItems_remove(nodes.id, token,demo)
                .then(resp=>{
                  const _id =resp.list_id.textarea_id;
                  getDispatch_uidDelete(_id)
                  dispatchLoading_false();
                }).catch(console.log)
  return {element:element,parentNode:nodes,smg:'eliminado'}
  
}

// RENOMBRAR ITEM

export const RenombrarItems = (htmlElement_id:string,demo:string) => {
  const element =  document.getElementById(htmlElement_id) as HTMLElement;
  const fatherNote = element.parentNode as HTMLElement;

  const nodes = document.getElementById(htmlElement_id) as HTMLElement;
  const token = localStorage.getItem('token') && localStorage.getItem('token');

  const txt = nodes.textContent as string;
  const input = ` <input type='text' form='items_renomber'
   required='true' class='renombrar'
   name='renombrar' maxlength='50' />`;


  nodes.innerHTML=input;
  const inputNeto = nodes.querySelector('input') as HTMLInputElement;
  inputNeto.value=txt;

  
  
  inputNeto.select();
  inputNeto.onblur=function(){
  
    const valid= /\w/;
    const valor =inputNeto.value;
    if(valid.test(valor)){
           
      nodes.textContent=inputNeto.value;
      DispatchItems_renombrar(fatherNote.id,token,{
        value:inputNeto.value
      },demo)

    }else{
      nodes.textContent=txt;
   
    }
  }
  
  const form = document.getElementById('items_renomber') as HTMLFormElement;
  form.onsubmit=function(e){
    e.preventDefault();
  
    const valid= /\w/;
    const valor =inputNeto.value;
    const input = nodes;
if(valid.test(valor)){
  input.textContent=valor;
      DispatchItems_renombrar(fatherNote.id,token,{
      value:inputNeto.value
    },demo)
  
}else{
  input.textContent=txt;
}

  

    
  }
  
  return {element:element,parentNode:fatherNote,smg:'remobar'} 

}

