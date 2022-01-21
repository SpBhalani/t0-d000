import { todoConstants } from "../actions/actionConstants";

const initialState = {
    todo : [],
    loading:false,
    error:false
}

export const todoCrud = (state=initialState , action) => {
    switch (action.type) {
        case todoConstants.GET_TODO_REQUEST:
            return{
                ...state,
                loading:true
            }
        case todoConstants.GET_TODO_SUCCESS:
            return {
                ...state,
                todo : action.payload.todo,
                loading:false,
                error:false
            }
        case todoConstants.GET_TODO_FAILURE:
            return{
                ...state,
                error:true,
                loading:false
            }        
        case todoConstants.ADD_TODO_REQUEST:
            return{
                ...state,
                loading:true
            }    
        case todoConstants.ADD_TODO_SUCCESS:
            return{
                ...state,
                loading:false,
                error:false,
                todo:action.payload.todo.todo
            }    
        case todoConstants.ADD_TODO_FAILURE:
            return{
                ...state,
                loading:false,
                error:true
            }
        case todoConstants.REMOVE_TODO_REQUEST:
            return{
                ...state,
                loading:true,
            }        
        case todoConstants.REMOVE_TODO_SUCCESS:
            return{
                ...state,
                loading:false,
                error:false,
                todo:action.payload.todo.todo
            }  
        case todoConstants.REMOVE_TODO_FAILURE:
            return{
                ...state,
                loading:false,
                error:true
            }      
        default:
            return{...state};
    }
}