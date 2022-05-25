import { ChangeEvent, useLayoutEffect, useState } from "react";

interface ValurTextareaProps {
    heightScroll: number;
    RowsNumb: number;
    coldScroll: number;
    value: string;
    _id: string;
    data: string;
    type: string;
    user: string;
}

interface ControlProps{
    coldScroll?: number, heightScroll?: number, uid?: string ,ok:boolean
}

export const useTextarea = (frangNote: ValurTextareaProps,control:ControlProps) => {

    const [value, setvalue] = useState<ValurTextareaProps>(frangNote);

    const [controles, setcrontroles] = useState<ControlProps>(control);

    const { heightScroll, coldScroll, uid ,ok} = controles;



    const handleChange = (e: ChangeEvent) => {

        const element = e.target as HTMLInputElement;
        const height = element.scrollHeight;

        setcrontroles({ ...controles, heightScroll: height, uid: element.id });

        // setvalue([...value.map(resp =>
        //     resp.uid === element.id
        //         ? { ...resp, txt: element.value }
        //         : resp)
        // ]);

        setvalue({
            ...value,
            [element.name]:element.value
        })
    };


    useLayoutEffect(() => {

        if(!ok) return;

        if (heightScroll! < coldScroll!) return;

        // setvalue((state) => [...state.map(resp =>
        //     resp.uid === uid
        //         ? { ...resp, RowsNumb: resp.RowsNumb + 1 }
        //         : resp)
        // ]);
        
        setvalue(resp => ({...resp,RowsNumb:resp.RowsNumb+1}))

        setcrontroles( state=> ({ ...state, coldScroll: state.heightScroll! + 10 }));

    }, [heightScroll, coldScroll,ok,uid]);




    return {
        value,
        setcrontroles,
        handleChange,
        setvalue
    }
}
