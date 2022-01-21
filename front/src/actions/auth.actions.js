import { authConstants } from "./actionConstants"
import { axiosInstance } from "../helpers/axios";

export const login = (user ) =>{
    return async (dispatch) => {
        try{
            dispatch({
                type: authConstants.LOGIN_REQUEST
            })
            const {email,password} = user;
             
            const res = await axiosInstance.post('/signin' , {email,password})
                if (res?.status === 200) {
                    const { token, user } = res.data;
                    const user1 = {
                        _id:user._id,
                        fName:user.fName,
                        lName:user.lName,
                        email:user.email
                    }
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user1));
                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, user:user1
                        }
                    })
                }
        }
        catch(e){
            dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload:{
                        statusCode : parseInt(e.message.substr(-3,3))
                    }
                })   
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try{

            dispatch({
                type:authConstants.LOGOUT_REQUEST
            })
            const res = await axiosInstance.post('/signout')
            if(res.status === 200){
                localStorage.clear()
                dispatch({
                    type:authConstants.LOGOUT_SUCCESS
                })
            }
        }
        catch(e){
            dispatch({
                type:authConstants.LOGOUT_FAILURE
            })
        }
    } 
}