const express = require("express");
const router = express.Router();
const tricalorie = require("./schema")

router.get("/", async function(req, res){


    let data = await tricalorie.find({});

    res.json({data})

   
    
})


router.post("/add", async function(req,res){


    let newItem = new tricalorie({ food:req.body.food, number: req.body.number});

    newItem.save(function(err, data){
        if(err){
           
            res.status(500).send({error: "something went wrong"});
            return
        }

        res.send(data)
    })
})

router.get("/edit/:id", async function(req,res){
    let id = req.params.id;
    //console.log(id);
    let data= await tricalorie.findById(id);

    if(!data){
        res.send(" data not found")
     
    }else {
        res.send(data)
    }


})

router.put("/update/:id", async function(req,res){
 let id = req.params.id;
 let food = req.body.food;
 let number = req.body.number;

 let data= await tricalorie.findByIdAndUpdate(id, {food,number},{new:true});

 if(!data){
   
     res.send('An error occurred');
 }else{
     res.send("update successfull")
 }
});

router.delete("/delete/:id", async function(req,res){
    let id = req.params.id;
    let data = await tricalorie.findByIdAndDelete(id);
    if(!data){
        res.send("An error occured");
    }else{
        res.send("delete successful")
    }
})

router.delete("/delete", async function(req,res){

    let data = await tricalorie.deleteMany({});

    if(!data){
        res.send("An error occured");
    }else{
        res.send("delete successful");
    }
})


module.exports = router;