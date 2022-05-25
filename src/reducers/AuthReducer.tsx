import { AuthLoginProps } from "../main/contexts/AuthContex";

type Props=
          |{type:'enter',payload:AuthLoginProps}
          |{type:'token',payload:AuthLoginProps}


export const AuthReducer = (state:AuthLoginProps,action:Props) : AuthLoginProps => {
  switch (action.type) {
      case 'enter' :
            return{
                ...action.payload
            };
      case 'token' :
            return{
              ...action.payload
            }
      default: return state;
          
  }
}
