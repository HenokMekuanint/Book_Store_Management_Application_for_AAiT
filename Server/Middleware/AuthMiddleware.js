import  Jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

export const protect =asyncHandler( async (req,res,next) =>{
        let token
        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")
            ) {
                try {
                    token = req.headers.authorization.split(" ")[1];
                    const decode =Jwt.verify(token,process.env.JWT_SECRET);
                    req.user= await User.findById(decode.id).select("-password");
                    next()
                } catch (error) {
                    console.log(error);
                    res.status(401);
                    throw new Error("Not authorized , no failed");
                }
        }
        if(!token){
            res.status(401);
            throw new Error("Not authorized , no token");
        }
    }
)
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an Admin");
    }
  };
export const staff = (req, res, next) => {
    if (req.user && req.user.isStaff) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an ");
    }
  };
//   export { staff,protect, admin };
// export default protect;