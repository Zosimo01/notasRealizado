
export const AnimationLoading = () => {
  return (
      <div className="animation_padre" >

    <div className="animation_loading" />
      </div>
  )
}

export const addLoading =(node:any,nameLoadig:any)=>{
    const loading =document.querySelector('.'+nameLoadig) as HTMLElement;
    if(!loading){
      const element = document.createElement('div');
      element.className='add_loading';
      element.style.float='right'
      element.style.width='12px'
      element.style.height='12px'
      
      node.appendChild(element);
    }
    

    return 'add_loading'
}

// OPEN ITEM AND OCULT

export const openItemsAndOcult =(node:HTMLElement,none:string,block:string)=>{
  
 
  const children = node.childNodes;
  const numChildren = Array.from(children);
  let smg=''
  // console.log(children)
  for (let i in numChildren) {
    const child = children[i] as HTMLElement;
    if (child.nodeName === 'DIV' && child.className === 'items') {
          const spam = node.querySelector('span') as HTMLSpanElement;
          
          if (child.style.display ===none) {
              child.style.display = block;
              spam && (spam.style.transform = 'rotate(90deg)');
            } else {
              child.style.display = none;
              spam && (spam.style.transform = 'rotate(0deg)');
          }
      }
      smg='corret'
  }

  
  return{
    smg
  }
}

export const removeItemsAndOcult =(node:HTMLElement,none:string,block:string)=>{

  node.remove();

  
}