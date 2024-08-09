import { Timestamp } from "mongodb";
import mongoose,{Schema} from "mongoose";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema({
    userName:{
        typeof: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,

    },
    email:{
        typeof: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type:String,
        required: true,
        trim: true,
        index:true
    },
    avatar: {
        type:String,
        required: true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true , "password is required"],

    },
    refreshToken:{
        type:String
    }

},
{
    timestamps:true
})

UserSchema.pre("save" , async function ( next) { 
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
    
})

UserSchema.methods.isPasswordCorrect = async function (password){
    return  await bcrypt.compare(password, this.password)
}

UserSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName,

        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            

        },
        process.env.REFRESH_TOKEN,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", User);