import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async(req ,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
        
        if(!token){
            throw new ApiError(401 , "Unauthorized request")
        }

        
     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
     const user =  await User.findById(decodedToken?._id).select("-password -refreshToken")
     if(!user){
         throw new ApiError(401 , "invalid Access Token")
     }
 
     req.user = user
    //  console.log(req.user , " => user is here");
     next()
   } catch (error) {
    throw new ApiError(400 , error?.message || "Invalid access Token")
   }
})

