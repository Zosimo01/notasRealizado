import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ButtonBody } from "../components/ButtonBody";
import { Contex } from "../contexts/AuthContex";

import { NotesContex } from "../contexts/NoteContex";
import { DispatchTextarea_create } from "../dispatch/DispatchNotes";
import { useTextarea } from "../hooks/useTextarea";

type NameButton = | 'guardar' | 'editar';

const control = {
    coldScroll: 50, heightScroll: 0, uid: '', ok: false
}

export const ContainerBody = () => {


    const [control_textarea, setcontrol_textarea] = useState({ focus: false, disable: true });
    const [obrirTarea, setabrirTarea] = useState(false)

    const Element_textarea = useRef<HTMLTextAreaElement>(null);


    const {
        notes: { getnoteList, uidItem, setnotesList, uidDeletes },

    } = useContext(NotesContex);;
    const {authLogin} = useContext(Contex);

    const { value, handleChange, setcrontroles, setvalue } = useTextarea(frangNote, control);


    const handleClick = (e: MouseEvent) => {
        const resp = e.target as HTMLElement;

        setcrontroles({
            coldScroll: resp.scrollHeight + 10,
            heightScroll: resp.scrollHeight,
            uid: resp.id,
            ok: true
        });
    }
// console.log(uidItem)
    const handleSaveNote = (e: MouseEvent) => {
        const element = e.target as HTMLElement;
        const name: NameButton = element.dataset.name as NameButton;

        if (name === 'guardar') {

            setnotesList.map(resp => {
                if (resp._id === value._id) {
                    resp.value = value.value;
                }
                return resp
            })

            DispatchTextarea_create({
                uid: uidItem,
                _id:getnoteList!._id,
                token: localStorage.getItem('token') && localStorage.getItem('token'),
                value: {
                    data: (new Date().getMinutes()).toString(),
                    value: value.value,
                    type: 'file',
                    RowsNumb: value.RowsNumb
                }
            },authLogin.demo).then(()=>{
                const node = document.getElementById('button_editables')?.querySelector('p') as HTMLParagraphElement;
                node.textContent='ok!'
                node.style.animationName='animate';
                setTimeout(()=>{
                node.style.animationName='';
                },1500);
            }).catch(()=>{
                const node = document.getElementById('button_editables')?.querySelector('p') as HTMLParagraphElement;
                node.textContent='error'
                node.style.animationName='animate'
                node.style.color='red'
                setTimeout(()=>{
                    node.style.animationName='';
                    },1500);
            })

        }
        else if (name === 'editar') {
            const textarea = Element_textarea.current as HTMLTextAreaElement;
            textarea.disabled = false;
            textarea.focus();
        }
    }

  
        const portal = () => {

        const elemet = ButtonBody({ handleSaveNote, control_textarea })

        const node = document.getElementById('container_title') as HTMLElement;

        if (!node) return
        return createPortal(elemet, node);
    }

    useEffect(() => {

        if (!getnoteList?.user) {
            setvalue({ ...frangNote })
        } else {
            const element = Element_textarea.current as HTMLTextAreaElement;
            if (element) {
                if (!getnoteList.value) {
                    element.disabled = false;
                    element.focus();

                } else {
                    element.disabled = true;
                }
            };

            setvalue(state => ({
                ...state,
                data: getnoteList.data,
                user: getnoteList.user,
                _id: getnoteList._id,
                value: getnoteList.value,
                type: getnoteList.type,
                RowsNumb: Number(getnoteList.RowsNumb)
            }));
            setcontrol_textarea(resp => ({ ...resp, disable: false }));
            setabrirTarea(true);
        }

    }, [getnoteList, setvalue]);


    useEffect(() => {


        const list = uidDeletes.find(resp => resp === value.user);

        if (!list) return

        setcontrol_textarea(resp => ({ ...resp, disable: true }));
        setabrirTarea(false);
        setvalue(frangNote);

    }, [uidDeletes, value.user , setvalue]);


    return (
        <>

            <div className="container_body" >


                <div className="apuntes" >
                    {
                        obrirTarea
                            ? (<> <textarea name={'value'} id={value._id}
                                cols={25} readOnly={false}

                                ref={Element_textarea}

                                spellCheck={false}
                                onChange={handleChange}
                                onClick={handleClick}
                                value={value.value}
                                placeholder='crea su nueva nota!!!!!!!!'

                            >

                            </textarea>

                            </>)
                            : (<div style={{textAlign:'center'}} >
                                <h1>WELCOME YOUR NOTE!!!</h1>
                            </div>)
                    }

                </div>
            </div>
            {
                portal()
            }

        </>
    )
}


const frangNote =
{
    heightScroll: 0,
    RowsNumb: 2,
    coldScroll: 50,
    value: '',
    _id: (Math.random() * 10000).toString(),
    data: '',
    type: '',
    user: ''
}
