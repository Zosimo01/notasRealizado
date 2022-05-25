import { createContext, useReducer } from "react"
import { AnimationReducer, ValueAnimationProps } from "../../reducers/AnimationReducer";

interface AnimaitonContexProps{
    valueAnamation:ValueAnimationProps,
    dispatchLoading_false:()=>void,
    dispatchLoading_true:()=>void,
    dispatchOpendTextarea_false:()=>void,
    dispatchOpendTextarea_true:()=>void
}

const initializer:ValueAnimationProps={
    loadingItems:false,
    opendTextarea:false
}

 export const ContexAnimation= createContext({} as AnimaitonContexProps);

export const AnimationContex = ({children}:any) => {

    const [state, dispatch] = useReducer( AnimationReducer,initializer);
    
    const dispatchLoading_false =()=>{
        dispatch({type:'loadingItems [false]'})
    }
    const dispatchLoading_true =()=>{
        dispatch({type:'loadingItems [true]'})
    }

    const dispatchOpendTextarea_true = ()=>{
        dispatch({type:'opendTextarea [true]'})
    
    }

    const dispatchOpendTextarea_false = ()=>{
        dispatch({type:'opendTextarea [false]'})
    }


  return (
    <ContexAnimation.Provider value={{
        valueAnamation:state,
        dispatchLoading_false,
        dispatchLoading_true,
        dispatchOpendTextarea_false,
        dispatchOpendTextarea_true
    }}>
        {children}
    </ContexAnimation.Provider>
  )
}
