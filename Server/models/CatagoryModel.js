import mongoose from "mongoose";

const catagorySchema=mongoose.Schema({

    name:{
        
        type:String,
        require:true,
        unique:true,
    },
},
{
    timestamps:true

})
const catagory= mongoose.model("catagory",catagorySchema)
export default catagory