// here we make a our custome middleware which are store our login user
import { User } from "../models/user.model.js"
import { apiError } from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async(req,_,next)=>{
    const {accessToken} = req.body
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") || accessToken

        if(!token){
            throw new apiError(401,"unAuthorized request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new apiError(401,"Invalid AccessToken")
        }

        req.user = user
        next()
    } catch (error) {
        throw new apiError(401,error?.message || "Invalid Accesstoken")
    }
})