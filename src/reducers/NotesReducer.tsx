

export interface TextareaListProps {
    value: string,
    data:string,
    user:string,
    type:string,
    _id:string,
    RowsNumb:number,
    name:string
}   


export interface NotesProps {
    setnotesList:TextareaListProps[],
    getnoteList:TextareaListProps | undefined,
    uidItem:string,
    uidDeletes:[],
    uidContexItem:string,
    numItems:string[]
}

type Props =
    | { type: 'setNotesList [true]',payload:TextareaListProps }
    | {type:'getNoteList [true]',payload:TextareaListProps}
    | {type:'uid itemList [true]', uidItem:string}
    | {type:'uid delete [true]' , payload:[]}
    | {type:'uid contexItem [true]' , uidContex:string}
    | {type:'numitems[true]' ,payload:string}



export const NotesReducer = (state: NotesProps, action: Props): NotesProps => {
    switch (action.type) {
        case 'setNotesList [true]':
            return{
                ...state,
                setnotesList:[...state.setnotesList,action.payload]
            }
        case 'getNoteList [true]':
            return{
                ...state,
                getnoteList:action.payload,
            }
        case 'uid itemList [true]':
            return{
                ...state,
                uidItem:action.uidItem
            }
        case 'uid delete [true]':
            return{
                ...state,
                uidDeletes:action.payload
            }
        case 'uid contexItem [true]':
            return{
                ...state,
                uidContexItem:action.uidContex
            }
        case 'numitems[true]':
            return{
                ...state,
                numItems:[...state.numItems,action.payload]
            }
        default: return state
    }
}
