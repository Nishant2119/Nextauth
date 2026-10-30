import Nodemailer from 'nodemailer';
import User from '@/models/userModels';
import Bcrypt from 'bcryptjs';


export const sendEmail = async ({email,emailType,userId}:any) => {
    try
    {
      const hashedtoken =  await Bcrypt.hash(userId.toString(),10);

     if(emailType === 'VERIFY')
     {
        await User.findByIdAndUpdate(userId,{
        verifyToken:hashedtoken,
        verifyTokenExpiry:Date.now() + 600000},
      {new:true,runValidators:true});
     }
     else if(emailType==="RESET")
     {
        await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:hashedtoken,
        forgotPasswordExpiry:Date.now() + 600000},
        {new:true,runValidators:true});
     }
    }
    catch(err:any)
    {
        throw new Error(err.message);
    }
}