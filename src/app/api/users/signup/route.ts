import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels.js'
import {NextRequest,NextResponse} from "next/server"
import Bcrypt from 'bcryptjs'
import {sendEmail} from "@/helpers/mailer"
connect()

export async function POST (request:NextRequest){
    try 
    {
        const reqBody = await request.json();
        const {username,password,email} = reqBody;

       const user = await User.findOne({username})
       if(user)
       {
         return NextResponse.json({error:"User already exist"},{
            status:500
         })
       }
       
       // Hashing password 
       const salt = await  Bcrypt.genSalt(10);
       const hashedpassword = await Bcrypt.hash(password,salt);
       // save user 
      const newUser =  new User({
        username:username,
        email:email,
        password:hashedpassword
       });

      const savedUser =  await newUser.save();

      // send a email

       await sendEmail({email:savedUser.email,emailType:"VERIFY",userId:savedUser._id});
      return NextResponse.json({
        message:"User created successfully",
        success:true,
        savedUser
    })
    }
    catch(error:any)
    {
        return NextResponse.json({error: error.message},{status:500});
    }
}