import { createContext, useReducer } from "react";
import {NotesProps, NotesReducer, TextareaListProps } from "../../reducers/NotesReducer";;

interface NotesContexProps {
    notes: NotesProps,
    setDispatch_notesTextarea: (payload: TextareaListProps) => void,
    getDispatch_notesTextarea: (payload: TextareaListProps) => void,
    getDispatch_uidDelete:(payload:[])=>void;
    setDispatch_uidContex:(uidContex:string)=>void,
    setDispatch_uidItemList:(uidItem:string)=>void,
    setDispatch_numItem:(payload:string)=>void
};

const initiState: NotesProps = {

    setnotesList: [],
    getnoteList: {
        _id: '',
        value: '',
        type: '',
        user: '',
        data:'',
        RowsNumb:2,
        name:''
    },
    uidItem:'',
    uidDeletes:[],
    uidContexItem:'',
    numItems:[]
}

export const NotesContex = createContext({} as NotesContexProps);

export const NoteContex = ({ children }: any) => {

    const [state, dispatch] = useReducer(NotesReducer, initiState)

    const setDispatch_notesTextarea = (payload: TextareaListProps) => {
        dispatch({ type: 'setNotesList [true]', payload });
    }

    const getDispatch_notesTextarea = (payload: TextareaListProps) => {
        dispatch({ type: 'getNoteList [true]', payload });
    }

    const setDispatch_uidItemList =(uidItem:string)=>{
        dispatch({type:'uid itemList [true]',uidItem})
    }

    const getDispatch_uidDelete=(payload:[])=>{
        dispatch({type:'uid delete [true]',payload})
    }

    const setDispatch_uidContex=(uidContex:string)=>{
        dispatch({type:'uid contexItem [true]',uidContex})
    }

    const setDispatch_numItem=(payload:string)=>{
        dispatch({type:'numitems[true]',payload})
    }
    return (
        <NotesContex.Provider
            value={{
                notes: state,
                setDispatch_notesTextarea,
                getDispatch_notesTextarea,
                getDispatch_uidDelete,
                setDispatch_uidContex,
                setDispatch_uidItemList,
                setDispatch_numItem
            }}
        >
            {children}
        </NotesContex.Provider>
    )
}
