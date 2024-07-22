import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new apiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    // console.log('Request Body:', req.body);
    const {email,password,confirmpassword} = req.body
    
    // check The User Is Exists.
    const ExistedUser = await User.findOne({
        $or:[{ email }]
    })
    if(ExistedUser){
        throw new apiError(409,"User Is Already Existed")
    }
    const user = await User.create({
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken ")

    if(!createdUser){
        throw new apiError(500,"Something went Wrong while Registering.")
    }
    return res.status(201).json(
        new apiResponse(200,createdUser,"User Creation successfully")
    )
    
})

const getusers = asyncHandler(async(req,res)=>{
    const users = await User.find().select("-password -refreshToken "); // Exclude passwords
    if (!users) {
        throw new apiError(404, "No users found");
    }
    res.status(200).json(new apiResponse(200, users, "Users fetched successfully"));
})

const login = asyncHandler(async (req,res) =>{
    const {email,password} = req.body

    if(!email){
        throw new apiError(400,"Email is required")
    }

   const user = await User.findOne({email})

    if(!user){
        throw new apiError(404,"User not Found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new apiError(401,"Invalid Creditional")
    }

    // Generate Refresh and access tokens
    const {accessToken,refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken ") 
    const options ={
        httpOnly : true,
        secure:true
    }

    return res.
    status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(200,{user:loggedInUser,accessToken,refreshToken},"User Login successfully")
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged Out"))
})

export {registerUser,getusers,login,logoutUser}