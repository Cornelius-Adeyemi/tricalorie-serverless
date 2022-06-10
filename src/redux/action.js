

const baseUrl = "/.netlify/functions/server"

const ADD = "ADD";


const LOAD = "LOAD";
const LOADING = "LOADING";
const ERROR = "ERROR";
const STATUS = "STATUS";
const ERRORSTATUS = "ERRORSTATUS";


const loadAction = ()=>{
    return {type: LOADING, payload:true }
}

const loadData = (data,status)=>{
    return {type:LOAD, payload:data, status}
}

const errorAction = (err)=>{
    return {type:ERROR, payload:err}
}

export const statusAction = (status)=>{
    return {type:STATUS, payload:status};
}

export const errorStatusAction = (status)=>{
    return {type:ERRORSTATUS,payload:status}
}

 export const loadState = (status)=> async(dispatch)=>{
    status = status || "";
    dispatch(loadAction());
   
    try{
    let data = await fetch(baseUrl + "/");
    
      if(data.status===200){
        
       let res = await data.json();
       console.log(res.data)
       dispatch(loadData(res.data,status))
       
      }else{
       let err = new Error("Error:" + data.status); 
     
        throw err
      
      }
    }
    catch(err){
        console.log(err.message)
        
        dispatch(errorAction(err.message));
    }
}

const postItem = (data, status)=>{
    return {type:ADD, payload:data,status}
}


 export const addItem = (food,number)=> async (dispatch)=>{
     const body = {food, number};
     try{
    const data = await fetch(baseUrl + "/add",
    {method:"POST",
     body:JSON.stringify(body),  
     headers:{
        "Content-Type": "application/json",
      "Origin":"http://localhost:3000/",
       "Accept": "application/json"}});
     if(data.status ===200){
      let response = await data.json();
      dispatch(postItem(response,"Add successfully"));
     }else{
         let err = new Error("Error"+ data.status);
         throw err;
     }

    }catch(err){
        console.log(err);
        dispatch(errorStatusAction(err.message));
    }
}



export const updateItem= (id,food,number)=> async (dispatch)=>{
    let body = {food,number}

    try{
    let data = await fetch(baseUrl + `/update/${id}`, {
        method:"PUT",
        body:JSON.stringify(body),  
        headers:{
        "Content-Type": "application/json",
        "Origin":"http://localhost:3000/",
        "Accept": "application/json"}});
      // console.log(data);
      if(data.status ===200){
        let response = await data.text()
        console.log(response);
        dispatch(loadState(response));
      }else{
          let err = new Error("Error" + data.status);
          console.log("na here i dey",err.message);
          throw err;
      }

    }catch(err){
        console.log(err);
        dispatch(errorStatusAction(err.message));
    }
    
}


export const deleteOneItem = (id)=> async(dispatch)=>{

   try{
    const data = await fetch(baseUrl + `/delete/${id}`,
    {
        method:"DELETE"
    });
    if(data.status ===200){

        let response = await data.text()
        console.log(response);
        dispatch(loadState(response));
      }else{
          let err = new Error("Error" + data.status);
          console.log("na here i dey",err.message);
          throw err;
      }

     

    }
    catch(err){

        console.log(err);
        dispatch(errorStatusAction(err.message));

    } 
}


export const clearAll = ()=> async (dispatch)=>{
   
    try{
   const data= await fetch(baseUrl + "/delete", {
        method:"DELETE"
    });
    if(data.status ===200){

        let response = await data.text()
        console.log(response)
        dispatch(loadState(response));
      }else{
          let err = new Error("Error" + data.status);
          console.log("na here i dey",err.message);
          throw err;
      }
    

    }
   catch(err){
       console.log(err);
       dispatch(errorStatusAction(err.message));
   }
}