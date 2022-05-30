import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animationFunction } from "../../animation/animation";

import { ButtonBody } from "../components/ButtonBody";
import { Contex } from "../contexts/AuthContex";

import { NotesContex } from "../contexts/NoteContex";
import { DispatchTextarea_create } from "../dispatch/DispatchNotes";
import { addLoading } from "../helpers/AnimationLoading";
import { getValueAllStyle } from "../helpers/getValueAll";
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
    const { authLogin } = useContext(Contex);

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

         const rest =addLoading(element,'add_loading',false)

            DispatchTextarea_create({
                uid: uidItem,
                _id: getnoteList!._id,
                token: localStorage.getItem('token') && localStorage.getItem('token'),
                value: {
                    data: (new Date().getMinutes()).toString(),
                    value: value.value,
                    type: 'file',
                    RowsNumb: value.RowsNumb
                }
            }, authLogin.demo).then(() => {
                const textarea = Element_textarea.current as HTMLTextAreaElement;
                textarea.disabled = true;
                document.querySelector('.'+rest)?.remove();
                const node = document.getElementById('button_editables')?.querySelector('p') as HTMLParagraphElement;
                node.textContent = 'ok!'
                node.style.animationName = 'animate';
                setTimeout(() => {
                    node.style.animationName = '';
                }, 1500);
            }).catch(() => {
                document.querySelector('.'+rest)?.remove();
                const node = document.getElementById('button_editables')?.querySelector('p') as HTMLParagraphElement;
                node.textContent = 'error'
                node.style.animationName = 'animate'
                node.style.color = 'red'
                setTimeout(() => {
                    node.style.animationName = '';
                }, 1500);
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

    const handleOcultItems = () => {
        const node = document.querySelector('#container_list') as HTMLElement;
        const huno= document.querySelector('.container_title')?.querySelector('h1') as HTMLElement;
        const value = getValueAllStyle(huno,'display');
    const {elementValue} = getValueAllStyle(node,'width');

        if(value.elementValue==='block') return;
        if (node.style.display === 'block') {
            const data:any = {
                node,
                 options:{duration:500},
                animation:[
                {position:'absolute',zIndex:'100',height:'100%', left:'0'},
                {position:'absolute',zIndex:'100',height:'100%',left:`-${elementValue}`}
              ]
              }
        
             const finish = animationFunction(data)
             finish.then(()=>{
               node.style.display = 'none';
            })
        } 
    }


    useEffect(() => {

        if (!getnoteList?.user) {
            setvalue({ ...frangNote })
        } else {
            const element = Element_textarea.current as HTMLTextAreaElement;
            if (element) {
                if (getnoteList.value) 
               {
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

    }, [uidDeletes, value.user, setvalue]);


    return (
        <>

            <div className="container_body" >


                <div className="apuntes" onClick={handleOcultItems} >
                  {
                      getnoteList?.name &&  <p className="namefolder" >/ {getnoteList?.name}</p>
                  }  
                    {
                        obrirTarea
                            ? (<> <textarea name={'value'} id={value._id}
                                cols={25} readOnly={false}
                                    disabled
                                ref={Element_textarea}

                                spellCheck={false}
                                onChange={handleChange}
                                onClick={handleClick}
                                value={value.value}
                                placeholder='PARA COMENZAR PRESIONE EDITAR!'

                            >

                            </textarea>

                            </>)
                            : (<div style={{ textAlign: 'center' }} >
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
