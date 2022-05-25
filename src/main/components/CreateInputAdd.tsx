
export const CreateInputAdd = (htmlElement_id: string) => {


    const nodeBrother = document.getElementById(htmlElement_id) as HTMLElement ;

    const input = `<input type='text' id='inputForAdd_FILI_FOLDER' form='formAddFile'
                 name='addname' maxlength='50' />`;
    const submit = `<input type='submit' name='submitAddFile' form='formAddFile' id='submitForAdd_FILI_FOLDER'
    />`;

    nodeBrother.insertAdjacentHTML('afterend', input);
    nodeBrother.insertAdjacentHTML('afterend', submit);

    return {
        input_id :'inputForAdd_FILI_FOLDER',
        submit_id:'submitForAdd_FILI_FOLDER'
    };

}

// CREATE ITEMS

export type TypeItem= 'file' | 'folder';

interface PropsItems{
    parentNode:any,
    type:TypeItem,
    id:string,
    _id:string,
    color?:string,
    value:string,
    margin:string
}

export const CreateItems =({parentNode,type,id,value,_id,margin}:PropsItems)=>{

    const nodeFather = parentNode as HTMLElement;
    const icon=['./img/folder2.png','./img/file.png']

    const element = `<div class="items" id=${_id}
     style="margin-left:${margin}px;
     width='100%'; ">
     <img src=${type==='folder' ? icon[0]:icon[1]} />
      ${type==='folder' ?'<span>></span>':''}
     
     <p id=${id} class="items_${type}" >
     ${value}</p>
     </div>` ;
     
    nodeFather.insertAdjacentHTML('beforeend',element);
    
    return{
        element_id:nodeFather.id,ok:true,_id    
    }
}
