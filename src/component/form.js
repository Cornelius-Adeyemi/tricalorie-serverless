
import {memo, useContext} from "react"
import {myContext} from "./controller";
import { addItem,updateItem,deleteOneItem, clearAll } from "../redux/action";
import { useDispatch } from 'react-redux';




 function Upper (props){
     const state = useContext(myContext)
     const dispatch = useDispatch();

    const add = (meal, number)=>{
        if(state.state.meal !== "" && state.state.calorie !==""){
            dispatch(addItem(meal,number));
            
            state.returnState();
        }
    }

    const update = (e,id, food,number)=>{
        dispatch(updateItem(id,food,number));
       
        state.updateFunction(e);

    }

    const deleteOne = (e,id)=>{
         e.preventDefault();
         dispatch(deleteOneItem(id));
        
         state.deletFunction()
    }

    const clearItAll = (e)=>{
        dispatch(clearAll());
         state.clearAll(e);
    }


    return (
        <div id="upper">
       <nav id="header">
           <h2> Tracalorie</h2>
           <button onClick={clearItAll}>Clear all</button>
       </nav>

       <div> 
       <form>
       <div id="form-div">
           <div id="form-title"> Add Meal/Food Item</div>
           <div id="input-flex">
        <div className="col">
        
            <input type="text" id="name" name="meal" value={state.state.meal} placeholder="Add item" onChange={state.onChange} />
            <label htmlFor="name" > Meal</label>
        </div>
        <div className="col">
        
            <input type="number" name="calorie" id="calories" value={state.state.calorie}  placeholder="Add calories" onChange={state.onChange} />
            <label htmlFor="calories" > Calories</label>
        </div>
        </div>
         <div id="btn-flex">
         { (state.state.edit === false)? <button id="add" onClick={(e)=>{
             e.preventDefault();
            add(state.state.meal, state.state.calorie);
           
         }} >Add Meal</button>:""}
         { state.state.edit && <div id="update-delete-back">
         <div id="update-delete">
         <button onClick={(e)=>{update(e,state.state.editIndex, state.state.meal,state.state.calorie)}} id="update">Update Meal</button> 
         <button onClick={(e)=>{deleteOne(e,state.state.editIndex)}} id="delete">Delete Meal</button>
         </div>
         <button onClick={state.backFunction} id="back">Back</button>
         </div>}
         </div>
        </div>
        
       </form>

       </div>
        </div>
    )
}


export default memo(Upper)