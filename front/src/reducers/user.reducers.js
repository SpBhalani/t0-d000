import { userConstants } from "../actions/actionConstants";

const initialState={
    statusCode:0,
    done:false,
    loading:false
}

export const signupReducer = (state=initialState , action) => {
    switch (action.type) {
        case userConstants.SIGNUP_REQUEST:
            return{
                ...state,
                loading:true
            }
        case userConstants.SIGNUP_SUCCESS:
            return{
                ...state,
                statusCode:200,
                loading:false
            }            
        case userConstants.SIGNUP_FAILURE:
            return{
                ...state,
                loading:false,
                statusCode:action.payload.statusCode
            }                
        default:
            return{
                ...state
            }
    }
}