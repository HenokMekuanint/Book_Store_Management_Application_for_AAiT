import mongoose from "mongoose";

const connectDatabase=async()=>{

   try{
       const connection= await mongoose.connect(process.env.MONGO_URL,{
           useUnifiedTopology:true,
           useNewUrlparser:true,
       });
       console.log("Mongo Connected");
   } catch(error){
       console.log(`ERROR: ${error.message}`)
       process.exit(1)
   }
}
export default connectDatabase
 