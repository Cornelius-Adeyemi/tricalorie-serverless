import {memo, useContext, useEffect} from "react"
import {myContext} from "./controller";


import {  useDispatch } from "react-redux";
import { errorStatusAction,statusAction } from "../redux/action";





export default memo(function Lower(props){
   const state = useContext(myContext);
  
   const total = state.totalCalorie(state.stateRed.item);
   const dispatch = useDispatch();

   const statusRemoval = ()=>{
       if(state.stateRed.status){
          dispatch(statusAction(""))
       }else if(state.stateRed.errorStatus){
           dispatch(errorStatusAction(""))
       }
   }

  
   useEffect(()=>{
   
    setTimeout(()=>{
        statusRemoval()
    },1500) 

   })
   
    return(<div id="section2">
        <div id="errorStatus"> { state.stateRed.status? <div id="successful">{state.stateRed.status}</div>:""}{ state.stateRed.errorStatus?<div id="error"> {state.stateRed.errorStatus}</div> :""}</div>
        <div> <h1>Total Calories: {total} </h1></div>
        <div>{ (state.stateRed.loading)? <div id="loading-div"> Loading.... </div> : (state.stateRed.error)? <div id="error-div"> {state.stateRed.error} </div>:
           (state.stateRed.item.length<1)? <div id="loading-div"> It is empty </div> : <ul id="unordered-list"  >
             {state.stateRed.item.map((item,index)=>{
               return <li key={index} onClick={(e)=>{ state.editFunction(e,item)}} id="list-item">
                   <span id="text"><span style={{fontWeight:"bold"}}>{item.food}</span>: <span style={{fontStyle:"italic"}}>{item.number + " calorie" }</span></span>
                   <span id="icon"><i className="fa fa-pencil" aria-hidden="true"></i></span>
                   
                   
                   </li>
             })}
            </ul> }
        </div>
    </div>)
})