
export interface ValueAnimationProps{
    loadingItems:boolean,
    opendTextarea:boolean
}

type AnimationProp =
        |{ type :'loadingItems [true]'}
        |{type:'loadingItems [false]'}
        |{type:'opendTextarea [true]'}
        |{type:'opendTextarea [false]'}

export const AnimationReducer =(state:ValueAnimationProps,action:AnimationProp):ValueAnimationProps=>{
    switch (action.type) {
        case 'loadingItems [true]':
                return{
                    ...state,
                    loadingItems:true
                }   
        case 'loadingItems [false]' :
                return {
                    ...state,
                    loadingItems:false
                }
        case 'opendTextarea [false]' :
                return{
                    ...state,
                    opendTextarea:false
                }
        case 'opendTextarea [true]' :
                return {
                    ...state,
                    opendTextarea:true
                }
        default: return state
    }
}