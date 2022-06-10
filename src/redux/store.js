import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";


const ADD = "ADD";
const STATUS = "STATUS";
const ERRORSTATUS = "ERRORSTATUS";
const LOAD = "LOAD";
const LOADING = "LOADING";
const ERROR = "ERROR"

const defaultState = {
 loading:false,
 status:"",
 errorStatus:"",
item : [],
edit: false,
editIndex: 0,
error:"",
}

const theReducer = (state = defaultState, action)=>{

    switch(action.type){
        case LOAD:
            return {...state, error:"",loading:false,item: action.payload, status:action.status};

        case ADD: 
            let array = state.item; 
            array.push(action.payload)
            return {...state, item: array,error:"",status:action.status}
        case LOADING:
            return {...state, loading:true,error:""}
        case STATUS:
            return {...state, status:action.payload,error:"",errorStatus:""}
        case ERROR: 
            return {...state,loading:false, error: action.payload};
        case ERRORSTATUS:
            return {...state, errorStatus:action.payload,status:""}
        default:
            return state;    
    }

}


let store = createStore(theReducer,applyMiddleware(thunk,logger));

export { store}