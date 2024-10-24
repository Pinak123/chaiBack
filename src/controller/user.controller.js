import {asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req  , res) => {
    // Get user details from frontend
    //validate data
    //check if user already exists: username , email
    //upoad the image and  stuff to cloudinary
    // create user object- create entry in db
    // remove pasword and refresh token field from response
    // return response

    const {userName,  email , fullName ,password} = req.body;
    console.log("email: " + email);

    if ([userName,  email , fullName ,password].some(field => field?.trim() === "")) {
        throw new ApiError(400 , "All field are required");
    }
    const existingUser = User.findOne(
    { 
        $or :[{ userName } ,{ email }]
    } ,
    );
    if (existingUser) {
        throw new ApiError(409 , "User with email or username already exists ");
    }
    /// handling Images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required");
    }

    //upload cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath); 
    const coverImage = await uploadOnCloudinary(coverImagePath); 

    if (!avatar) {
        throw new ApiError(400 , "Avatar file is required");
    }

    //Database upload
    const user = User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName :userName.toLowerCase(), 
    })

    //Check user created
    const created_user = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!created_user){
        throw new ApiError(500 ,"Something went wrong registring user");
    }
    //Return api response
    return res.status(201).json(
        new ApiResponse(200,created_user , "User registered successfully")
    )
    
});

export {registerUser};