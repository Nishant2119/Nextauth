import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String ,
            required : [true,"Please provide a username"],
            unique:true,
        },
        email:{
            type:String,
            required : [true,"please provide an email"],
            unique:true,
        },
        password:
        {
            type:String,
            required:[true,"Please enter a valid password"],
        },
        isVerified:
        {
            type:Boolean,
            default:false,
        },
        isAdmin:
        {
            type:Boolean,
            default:false,
        },
        forgotPasswordToken:String,
        forgotPasswordExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,
    }
)

const User = mongoose.model.users || mongoose.model("users",userSchema);

export default User;