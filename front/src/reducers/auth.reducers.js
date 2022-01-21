import { authConstants } from "../actions/actionConstants"

const initialState ={
    token : null,
    user : {
        _id:"",
        fName : "",
        lName : "",
        email:""
    },
    authenticate : false,
    authenticating : false,
    loading:false,
    statusCode: 0

}
export const loginReducer = (state = initialState , action) => {
    console.log(action.type);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true,
                loading:true
            }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false,
                loading:false,
                statusCode:0
            }
        case authConstants.LOGIN_FAILURE :
            return{
                ...state,
                authenticating:false,
                loading:false,
                statusCode:action.payload.statusCode
            }
        case authConstants.LOGOUT_REQUEST:
            return{
                ...state,
                loading:true
            }    
        case authConstants.LOGOUT_SUCCESS:
            return {
            initialState
            }           
        case authConstants.LOGOUT_FAILURE:
            return{
                ...state,
                loading:false
            }    
        default:
            return state
    }
}