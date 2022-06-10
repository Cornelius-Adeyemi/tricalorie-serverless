const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tricalorieSchema = new Schema({
    food:{
        type: String
    },
    number: {
        type: Number
    },
    
})

const tricalorieModel = mongoose.model("tricalorie", tricalorieSchema);

module.exports = tricalorieModel;
