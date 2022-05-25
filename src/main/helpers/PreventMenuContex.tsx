import {  MouseEvent, RefObject,useEffect, useRef, useState } from "react";


interface Props {
  menuItems: RefObject<HTMLDivElement>,
  setDispatch_uidContex:(uidContex:string)=>void
}


export const PreventMenuContex = ({ menuItems, setDispatch_uidContex }: Props) => {

  let htmlElement_id = useRef('')
  const [positons, setpositons] = useState({ top: '0', left: '0' });

  const handlePreventContexMenu = (e: MouseEvent) => {

    const target = e.target as HTMLDivElement;
    if(target.className==='items') return;
    const parentNode=target.parentNode as HTMLElement;
    
    setDispatch_uidContex(parentNode.id)
    htmlElement_id.current=target.id;

    const elementDos = document.querySelector('.container_list') as HTMLDivElement;

    const elementMenu = menuItems.current as HTMLDivElement;

     const typename= target.className.split('_');
     const child1 = elementMenu.childNodes[0] as HTMLParamElement;
     const child2 = elementMenu.childNodes[1] as HTMLParamElement;
    if(typename[1]==='file'){
         child1.style.display='none';
         child2.style.display='none';
    }else{
      child1.style.display='block';
      child2.style.display='block';
    }
    elementMenu.style.display = 'block';
    elementMenu.focus();

    elementMenu.onblur=function(){
    elementMenu.style.display = 'none';
    }

    const X = e.clientX;
    const Y = e.clientY;


    const { left, top } = elementDos.getBoundingClientRect();
    const windowheight = window.innerHeight;

    (Y + 200>= windowheight)
      ? setpositons(
        {
          left: (X - left) + 'px',
          top: (Y - top - elementMenu.offsetHeight) + 'px'
        })
      : setpositons({ left: (X - left) + 'px', top: (Y - top) + 'px' });

  }

  useEffect(() => {
    window.oncontextmenu = function () {
      return false;
    };

  }, []);

  return {
    handlePreventContexMenu,
    positons,
    htmlElement_id:htmlElement_id.current
  }
}

