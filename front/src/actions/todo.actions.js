import { axiosInstance } from "../helpers/axios"
import { todoConstants } from "./actionConstants"

export const getTodo = () => {
    return async (dispatch) => {
        try{
            dispatch({
                type:todoConstants.GET_TODO_REQUEST
            })
            const res = await axiosInstance.get('/todo/get');
            if(res.status === 200){
                dispatch({
                    type:todoConstants.GET_TODO_SUCCESS,
                    payload:{
                        todo : res.data
                    }
                })
            }
        }
        catch(e) {
            dispatch({
                type:todoConstants.GET_TODO_FAILURE
            })
        }
    }
}

export const addTodo = (addNew) => {
    return async (dispatch) => {
        try{

            dispatch({
                type:todoConstants.ADD_TODO_REQUEST
            })
            const res = await axiosInstance.post('/todo/set' , {task:addNew})
            if(res.status === 200){
                dispatch({
                    type:todoConstants.ADD_TODO_SUCCESS,
                    payload:{
                        todo : res.data
                    }
                })
            }
        }
        catch(e) {
            dispatch({
                type:todoConstants.ADD_TODO_FAILURE
            })
        }
        
    }
}

export const removeTodo = (id) => {
    return async (dispatch) => {
        try{
            dispatch({
                type:todoConstants.REMOVE_TODO_REQUEST
            })
            const res = await axiosInstance.post('/todo/remove' , {_id:id})
            if(res.status === 200){
                dispatch({
                    type:todoConstants.REMOVE_TODO_SUCCESS,
                    payload:{
                        todo : res.data
                    }
                })
            }
        }
        catch(e){
            dispatch({
                type:todoConstants.REMOVE_TODO_FAILURE
            })
        }
    }
}