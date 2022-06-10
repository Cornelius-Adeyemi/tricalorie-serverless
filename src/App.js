import Upper from "./component/form"
import './App.css';
import {useEffect,memo} from "react";
import Lower from "./component/bottom"
import { myContext, useProvider} from "./component/controller"

import { useDispatch} from 'react-redux';
import {loadState} from "./redux/action"


function App() {


  
  const value = useProvider();

   const dispatch = useDispatch()
  // eslint-disable-next-line
  useEffect(()=>{
   
   dispatch(loadState());
   // eslint-disable-next-line
  },[])

  return (
    <myContext.Provider value={value} >
    <div id="app">
      
     <Upper  />
     <Lower  />

   
    </div>
    </myContext.Provider>
  );
}

export default memo(App);
