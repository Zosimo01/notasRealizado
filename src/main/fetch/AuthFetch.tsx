interface FetchPros{
  method?:string,
  data?:{},
  enpoint:string,
  token?:string | null,
}

const url=process.env.REACT_APP_API_URL;

export const AuthFetch = ({method,data,enpoint}:FetchPros) => {
  
  if(method==='GET')
   return  fetch(url+enpoint)
else
  return fetch(url+enpoint,{
    method,
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(data)
  });
}

export const AuthFetch_token = ({method,data,enpoint,token}:FetchPros) => {
  const dirrection = `${url}/${enpoint}`
  if(method==='GET')
   return  fetch(dirrection,{
     method,
     headers:{
      'content-type':'application/json',
      'x-token':token!
     }
   })
else
  return fetch(dirrection,{
    method,
    headers:{
      'content-type':'application/json',
      'x-token':token!
    },
    body:JSON.stringify(data)
  });
}
