import { axiosInstance } from "../helpers/axios"
import { userConstants } from "./actionConstants"

export const signup = (user) =>{
    return async (dispatch) =>{
        try{

            dispatch({
                type:userConstants.SIGNUP_REQUEST
            })
            const res = await axiosInstance.post('/signup',user);
            
            if(res.status === 200){
                dispatch({
                    type:userConstants.SIGNUP_SUCCESS
                })
            }
        }
        catch(e){
            dispatch({
                type:userConstants.SIGNUP_FAILURE,
                payload:{
                    statusCode:parseInt(e.message.substr(-3,3))
                }
            })
        }
    }
}