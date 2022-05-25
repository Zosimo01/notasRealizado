import { AuthFetch_token } from "../fetch/AuthFetch"

interface Props{
    uid:string,
    id:string,
    value:string,
    type:'file' | 'folder',
    token:string | null,
}

export const DispatchNotes_create =async ({uid,id,value,type,token}:Props,demo:string) => {

    const data={id,value,type}

    try{

        const list =await AuthFetch_token({method:'POST',data,enpoint:`createNote/${uid}/${demo}`,token});
        const resp = await list.json();
        return resp;
    }catch(e){
        console.log('error en DispatchNotes_create')
    }
}

export const DispatchNotes_get= async({uid,token}:any,demo:string)=>{

    try{

        const list =await AuthFetch_token({method:'GET',enpoint:`getNotes/${uid}/${demo}`,token});
        const resp = await list.json();
        return resp;

    }catch(e){
        console.log('error en dispatchNotes_Get')
    }

}


// DISPATCH ASIA  TEXTAREA

export const DispatchTextarea_create = async({uid,_id,token,value}:any,demo:string)=>{
 
    try{
        const list = await AuthFetch_token({data:value,token,enpoint:`setTextarea/${uid}/${_id}/${demo}`,method:'POST'});
        const resp = await list.json();
        return resp;
    }catch(e){
        console.log('error en create el textarea')
    }
}

export const DispatchTextarea_get= async({uid,token}:any,demo:string)=>{

    try{

        const list =await AuthFetch_token({method:'GET',enpoint:`getTextarea/${uid}/${demo}`,token});
        const resp = await list.json();
        return resp;

    }catch(e){
        console.log('error en dispatchTextarea_Get')
    }

}

/// DISPATCH PARA ELIMINAR ITEMS

export const DispatchItems_remove=async(_id:string,token:string | null,demo:string)=>{
    try{
        const list =await AuthFetch_token({method:'DELETE',enpoint:`deleteNote/${_id}/${demo}`,token});
        const resp = await list.json();
        return resp;  

    }catch(e){
        console.log('error para "D..._remove "')
    }
}

// DISPATCH PARA ACTUALIZAR NAME ITEM

export const DispatchItems_renombrar=async(_id:string,token:string | null,data:any,demo:string)=>{
    try{
        const list =await AuthFetch_token({method:'PUT',enpoint:`renombrar/${_id}/${demo}`,token,data});
        const resp = await list.json();
        return resp;  
    }catch(e){
        console.log('error en "D...._renombrar"')
    }
}