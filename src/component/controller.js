import {createContext, useState} from "react"
import {  useSelector } from 'react-redux';
import {makeSelector} from "../redux/reselect";

const myState = {
    meal:"",
    calorie: "",
    
    edit: false,
    editIndex: 0
}



export function useProvider(){
    const [state, setState] = useState(myState);
    
    const stateRed = useSelector(makeSelector);
    


    const onChange = (e)=>{
        const name = e.target;
        setState((state)=>{return {...state,[name.name]:name.value }});
    }

    const returnState = (e)=>{
        if(state.meal ==="" || state.calorie===""){

        }else{
        setState((state)=>({...state,meal:"", calorie:"" } ))
        
        }
      
    }
    
    const editFunction = (e, item)=>{

        let element = e.target.parentElement.id;
          if(element ==="icon"){
           setState(state=>({...state,editIndex:item["_id"], edit:true, meal:item.food, calorie:item.number}))  
        }
    }
    
    const totalCalorie = (items)=>{
        let total;
        if(items.length>0){
           total = items.reduce((current, item, index)=>{
            return current + parseInt(item.number);
        },0 )
        }else{
           total = 0; 
        }

        return total;
    }
   
     const updateFunction = (e)=>{
         
         
         setState(state=>({...state,meal:"",calorie:"", edit:false}));
         e.preventDefault()
     }

    const deletFunction = ()=>{
       
        setState(state=>({...state,meal:"",calorie:"", edit:false, editIndex:0}));
       
    }

    const backFunction = (e)=>{
        setState(state=>({...state,meal:"",calorie:"",  edit:false, editIndex:0}));
        e.preventDefault();
    }

    const clearAll = (e)=>{
        setState(state=>({...state,meal:"", calorie:"", edit:false }));
        e.preventDefault();
    }

    return { stateRed, state, onChange, clearAll, returnState , editFunction, totalCalorie , updateFunction, deletFunction, backFunction}

}

export const myContext = createContext();