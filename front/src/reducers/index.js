import { combineReducers } from "redux";
import { loginReducer } from "./auth.reducers";
import { todoCrud } from "./todo.reducers";
import { signupReducer } from "./user.reducers";

export const rootReducer = combineReducers({
auth : loginReducer,
user: signupReducer,
todo:todoCrud
})