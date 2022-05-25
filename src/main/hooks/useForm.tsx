import { ChangeEvent, useState } from "react"



export const useForm = <T extends Object> (values:T) => {

    const [data, setdata] = useState (values)

    // const handleChange = (txt: string, search: keyof T)=>{
    //     setdata({
    //         ...data,
    //         [search]:txt
    //     })
    // }

    
    const handleChange = (e:ChangeEvent)=>{
        const node= e.target as HTMLInputElement;
        setdata({
            ...data,
            [node.name]:node.value
        })
    }

  return (
    {
        data,handleChange,setdata
    }
  )
}
