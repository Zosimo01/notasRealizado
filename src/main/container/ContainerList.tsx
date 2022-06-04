
import { FormEvent, MouseEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { animationFunction } from "../../animation/animation";
import { CreateItems, TypeItem } from "../components/CreateInputAdd";
import { ContexAnimation } from "../contexts/Animation";
import { Contex } from "../contexts/AuthContex";

import { NotesContex } from "../contexts/NoteContex"
import { DispatchNotes_create, DispatchNotes_get, DispatchTextarea_create, DispatchTextarea_get } from "../dispatch/DispatchNotes";
import { addLoading, AnimationLoading, openItemsAndOcult } from "../helpers/AnimationLoading";
import { getValueAllStyle } from "../helpers/getValueAll";
import { InputAdd_FILE_FOLDER, ItemsMenuClick, TypesItemMenu } from "../helpers/ItemsMenuClick";
import { PreventMenuContex } from "../helpers/PreventMenuContex";

interface ItemsListProps {
    value: string,
    id: string,
    user: string,
    type: string,
    _id: string
}


export const ContainerList = () => {

    const menuItems = useRef<HTMLDivElement>(null);
    const uid_htmlElement = useRef('');
    const typeItemFor_ADD = useRef('');
    const controlgetItems = useRef(false);
    const controlColorItem = useRef<HTMLElement>({} as HTMLElement);
    const controlColorItemColor = useRef<HTMLElement>({} as HTMLElement);
    const online = useRef(true);

    const [alertas, setalertas] = useState(0)

    const [smgAdvertencia, setsmgAdvertencia] = useState('crea nuevos archivos')

    const [reference_id, setreference_id] = useState('');

    const [listasDeItems, setlistasDeItems] = useState<ItemsListProps[]>([]);

    const { notes,
        getDispatch_notesTextarea,
        setDispatch_uidItemList,
        setDispatch_notesTextarea,
        getDispatch_uidDelete,
        setDispatch_uidContex

    } = useContext(NotesContex);

    const { authLogin } = useContext(Contex);

    const { positons,
        handlePreventContexMenu,
        htmlElement_id
    } = PreventMenuContex({ menuItems, setDispatch_uidContex });

    const {
        dispatchOpendTextarea_true,

        dispatchLoading_true,
        dispatchLoading_false,
        valueAnamation,
    } = useContext(ContexAnimation)


    const handleActiveAdd_FOLDER = (e: MouseEvent) => {
     
        const nodes = e.target as HTMLButtonElement;

        uid_htmlElement.current = nodes.id;
        typeItemFor_ADD.current = 'folder';

        InputAdd_FILE_FOLDER(nodes.id);
        setreference_id(authLogin.uid);

    };


    const handleClickItems = (e: MouseEvent) => {

        const event = e.target as HTMLDivElement;
        const parentNode = event.parentNode as HTMLElement;
        const itemName = event.dataset.nameitem as TypesItemMenu;

        uid_htmlElement.current = htmlElement_id;

        const resp = ItemsMenuClick(
            {
                action: itemName,
                htmlElement_id: uid_htmlElement.current,
                getDispatch_uidDelete, dispatchLoading_false, demo: authLogin.demo
            },
        );

        if (resp?.name === 'eliminar') {
            dispatchLoading_true();

        }

        if (resp?.name === 'file' || resp?.name === 'folder') {

            const element = resp.element;
            const node = resp.parentNode as HTMLElement;
            const name = addLoading(element, 'add_loading');

            if (node.lastChild?.nodeName === 'DIV') {
                openItemsAndOcult(node, 'block', 'block');

            } else {

                getItems_child(node, name, 'form');

            }
        }
        parentNode.blur();

        typeItemFor_ADD.current = itemName;
        const nodeParent = document.getElementById(htmlElement_id)?.parentNode as any;

        if (!nodeParent) return;
        setreference_id(nodeParent.id);

    }

    // GET ITEMS CHILD

    const getItems_child = (parentNode: HTMLElement, name: string, nodename: string) => {

        const data = {
            uid: parentNode.id,
            token: localStorage.getItem('token') && localStorage.getItem('token'),
        }

        DispatchNotes_get(data, authLogin.demo)
            .then(resp => {
                resp.list.forEach((da: any) => {

                    CreateItems({
                        parentNode,
                        id: da.id,
                        type: da.type as TypeItem,
                        value: da.value,
                        _id: da._id,
                        margin: '15'
                    });

                })
                document.querySelector('.' + name)?.remove()
                setsmgAdvertencia('')
            })
            .catch(() => {
                setsmgAdvertencia('');
                document.querySelector('.' + name)?.remove()
            })
    }

    // ADD FOLDE AND FILE
    const handleFromAdd_FOLDERyFILE = async (e: FormEvent) => {
        e.preventDefault();

        const input = document.getElementById('inputForAdd_FILI_FOLDER') as HTMLInputElement;
        const value = input.value;
       
        if (value.length < 1) return;
        const id = (Math.random() * 10000).toString().slice(-5);

        const { element, parentNode } = InputAdd_FILE_FOLDER(uid_htmlElement.current);
        element.blur();
        const node = parentNode as HTMLElement;

        dispatchLoading_true();

        const { eventos } = await DispatchNotes_create({
            uid: reference_id,
            id,
            value: value,
            type: typeItemFor_ADD.current as TypeItem,
            token: localStorage.getItem('token') && localStorage.getItem('token'),
        }, authLogin.demo);

        if (!eventos) {
            dispatchLoading_false();
            setsmgAdvertencia('no se pudo crear el archivo');

        }
        /// CRATE TEXTAREA
        if (typeItemFor_ADD.current === 'file') {

            DispatchTextarea_create({
                uid: eventos._id,
                _id: eventos._id,
                token: localStorage.getItem('token') && localStorage.getItem('token'),
                value: {
                    data: (new Date().getMinutes()).toString(),
                    value: '',
                    type: 'file',
                    RowsNumb: 2
                }
            }, authLogin.demo).then(resp => {

                setDispatch_notesTextarea(resp.note);
                getDispatch_notesTextarea({ ...resp.note, name: value });
                setDispatch_uidItemList(resp._id)
                dispatchOpendTextarea_true()
            }).catch(console.log)
        }
        /// CIERRE

        const payload = {
            value: eventos.value,
            user: reference_id,
            id: eventos.id,
            type: eventos.type,
            _id: eventos._id
        }


        if (eventos.user === authLogin.uid) {

            setlistasDeItems(resp => [...resp, payload]);
            dispatchLoading_false();
            setsmgAdvertencia('');
            setalertas(alertas + 1);
        }

        if (node.id === 'cotainer_option_list') return;

        //CREATE ITEMS

        const datosForItem = {
            parentNode,
            id: eventos.id,
            _id: eventos._id,
            value: eventos.value,
            type: eventos.type,
            margin: '15'
        }

        const { ok, _id } = CreateItems(datosForItem);
        if (ok) {
            dispatchLoading_false();
            const node = document.getElementById(_id) as HTMLElement;
            const controlColor = controlColorItem.current as HTMLElement;
            const controlColorColor = controlColorItemColor.current as HTMLElement;

            if (node.id !== controlColor.id) {
                controlColor.style && (controlColor.style.backgroundColor = '');
                node.style.backgroundColor = 'rgba(182, 155, 177, 0.603)';
                controlColorItem.current = node;

                controlColorColor.style && (controlColorColor.style.color = '');
                node.style.color = 'red';
                controlColorItemColor.current = node;
            }

        }


    }

    //CONTEXMENU    
    const handleContexMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.matches('span')) return;
        const id = target.id;
        handlePreventContexMenu(id, e.clientX, e.clientY);
    }

    /// ITEM OPEN

    const handleItemOpen = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const controlColor = controlColorItem.current as HTMLElement;
        const controlColorColor = controlColorItemColor.current as HTMLElement;
        if (target.matches('span')) {
            const span = target.dataset.id;
            if (!span) return;

            const p = document.getElementById(span) as HTMLParamElement;
            handlePreventContexMenu(p.id, e.clientX, e.clientY)



        } else {


            if (target.matches('p') && target.id !== controlColor.id) {
                controlColor.style && (controlColor.style.backgroundColor = '');

                // target.style.backgroundColor = 'rgba(182, 155, 177, 0.603)';
                controlColorItem.current = target;

                controlColorColor.style && (controlColorColor.style.color = '');
                target.style.color = 'red';
                controlColorItemColor.current = target;
            }


            if (!target.matches('p')) return;
            const parentNode = target.parentNode as HTMLElement;

            if (target.className === 'items_file') {
                // dispatch para abrir el documento
                dispatchOpendTextarea_true()
            

                const name = addLoading(target, 'add_loading');

                const data = {
                    uid: parentNode.id,
                    token: localStorage.getItem('token') && localStorage.getItem('token')
                }

                const respuesta = notes.setnotesList.find(da => da?.user === parentNode.id);

                if (!respuesta) {

                    if (online.current) {
                        online.current = false
                        DispatchTextarea_get(data, authLogin.demo)
                            .then(resp => {

                                getDispatch_notesTextarea({ ...resp.note, name: target.textContent });
                                setDispatch_notesTextarea(resp.note);
                                setDispatch_uidItemList(parentNode.id);

                                document.querySelector('.' + name)?.remove()
                                dispatchOpendTextarea_true()
                                online.current = true;

                                handleOcultItems()

                            })
                            .catch(console.log)
                    }
                } else {

                    getDispatch_notesTextarea({ ...respuesta, name: target.textContent! });
                    setDispatch_uidItemList(parentNode.id);
                    document.querySelector('.' + name)?.remove()
                    handleOcultItems()

                }

            }

            // ABRIR CARPETAS
            if (parentNode.lastChild?.nodeName === 'DIV') {
                openItemsAndOcult(parentNode, 'none', 'block')

            } // ABTENER DATOS DB
            else {

                const spam = parentNode.querySelector('.flecha') as HTMLSpanElement;
                spam && (spam.style.transform = 'rotate(90deg)');
                const name = addLoading(target, 'add_loading');
                getItems_child(parentNode, name, 'item')
            }
        }
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
        const auth = { ...authLogin }
        const data = {
            uid: auth.uid,
            token: localStorage.getItem('token') && localStorage.getItem('token'),
        }
        if (!controlgetItems.current) {

            DispatchNotes_get(data, auth.demo)
                .then(resp => {

                    if (!resp) return
                    setlistasDeItems([...resp.list]);
                    controlgetItems.current = true;

                    if (resp.list.length > 0) {
                        setsmgAdvertencia('')

                    }
                })
                .catch(() => {
                    setsmgAdvertencia('no se pudo abtener los archivos ó aun no se an creado')
                })
        }

    }, [authLogin]);


    useLayoutEffect(() => {
        if (alertas > 0) {
            const node = document.querySelector('.container_items');;
            const child = node?.lastChild as HTMLElement;

            const controlColor = controlColorItem.current as HTMLElement;

            if (child.id !== controlColor.id) {
                controlColor.style && (controlColor.style.backgroundColor = '');
                child.style.backgroundColor = 'rgba(182, 155, 177, 0.603)';
                controlColorItem.current = child;
            }

        }
    }, [alertas]);


    return (
        <>

            <div className="container_list" id="container_list" >
                <div className="cotainer_option_list" id="cotainer_option_list" >
                    {/* <button>filter</button>
                 */}
                    <button className="add_folder" id="add_folder" onClick={handleActiveAdd_FOLDER} >+</button>
                </div>
                <form id="formAddFile" onSubmit={handleFromAdd_FOLDERyFILE} >
                </form>
                {
                    valueAnamation.loadingItems && <AnimationLoading />

                }
                <div className="container_items"
                    onClick={handleItemOpen}
                    id="container_items" >
                    {
                        listasDeItems.map((resp, i) => (
                            <div className="items" key={i}
                                id={resp._id}
                                onContextMenu={handleContexMenu}
                                tabIndex={-1}
                            >
                                <span className="puntos" data-id={resp.id}>... </span>
                                <span className="flecha" >{'>'}</span>
                                <img src="./img/folder2.png" alt="plop" />

                                <p className={'items_' + resp.type} id={resp.id}
                                >

                                    {resp.value}

                                </p>
                            </div>
                        ))
                    }
                    {smgAdvertencia && <p style={{
                        padding: '5px'
                    }}>{smgAdvertencia}</p>}

                </div>

                <aside className="itemsMenu" ref={menuItems}
                    tabIndex={-1}
                    style={{
                        top: positons.top,
                        left: positons.left,

                    }}
                    onClick={handleClickItems}
                >
                    <p data-nameitem='file' >add file</p>
                    <p data-nameitem='folder'>add folder</p>
                    <p data-nameitem='renombrar'>renombrar</p>
                   
                    <p data-nameitem='eliminar' >eliminar</p>
                </aside>

                {/* REMOMBRAR LOS ITEMS */}
                <form id="items_renomber" style={{ display: 'none' }} ></form>
                <input type="submit" form="items_renomber" style={{ display: 'none' }} />

            </div>
        </>
    )
}
