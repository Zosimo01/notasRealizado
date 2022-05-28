import { AuthFetch, AuthFetch_token } from "../fetch/AuthFetch"

export const AuthDispatch_login = async(data:{email:string,password:string,demo:string}) => {

        try{
            const list = await AuthFetch({method:'POST',data,enpoint:'/login'});
            const resp =await list.json();
            if(resp.ok){
                localStorage.setItem('token',resp.token)
            }
                return resp;
            
        }
        catch(err){
            console.log('error en AuthDispatch_login')
        }
    }

export const AuthDispatch_crate = async(data:{email:string,password:string,demo:string}) => {

        try{
            const list = await AuthFetch({method:'POST',data,enpoint:'/create'});
            const resp =await list.json();
            if(resp.ok){
                localStorage.setItem('token',resp.token)
         
            }
                return resp
            
        }
        catch(err){
            console.log('error en AuthDispatch_create')
        }
    }


export const AuthDispatch_token=async(token:any)=>{
    try{
        const list = await AuthFetch_token({method:'GET',enpoint:'token',token})
        const resp = await list.json();
        if(resp.ok){
            localStorage.setItem('token',resp.smg);
            return resp;
        }
    }catch(err){
        console.log('error en AuthDispatch_token')
    }
}


export const AuthDispatch_sendCodyVeri=async(data:any)=>{
    try{
        const list = await AuthFetch({method:'POST',data,enpoint:'/sendmail'});
        const resp = list.json();
        return resp;
    }catch(err){
        console.log('error en Auth....._send....Veri')
    }
}


export const AuthDispatch_restaurarcontra=async(data:any)=>{
    try{
        const list = await AuthFetch({method:'POST',data,enpoint:'/restaurarcontra'});
        const resp = list.json();
        return resp;
    }catch(err){
        console.log('error en Auth....._rest...')
    }
}


export const AuthDispatch_changepassword=async(data:any)=>{
    try{
        const list = await AuthFetch({method:'POST',data,enpoint:'/changepassword'});
        const resp = list.json();
        return resp;
    }catch(err){
        console.log('error en Auth....._chang....p')
    }
}


