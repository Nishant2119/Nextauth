import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels.js'
import {NextRequest,NextResponse} from "next/server"
import Bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
connect();


export async function POST(request:NextRequest)
{
    try
{
    const reqBody = await request.json();
        const {email,password} = reqBody;
        //check if user exist or not 
       const user = await User.findOne({email});
       if(!user)
       {
        return NextResponse.json({error:"User does not exist"},{status:400});
       }
       // check if password is correct
      const validpassword = await Bcrypt.compare(password,user.password)
      if(!validpassword)
      {
        return NextResponse.json({error:"Incorrect password"},{status:402});
      }
      // creating tokendata
      console.log(user);
      const tokendata = {
        id:user._id,
        username:user.username,
        email:user.email
      }
      // create token
      const token = await jwt.sign(tokendata,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})

      const response  = NextResponse.json({
        message: "Login success",
        success:true
      })

      response.cookies.set("token",token,{
        httpOnly:true,
        path:'/'
      })

      return response;
}
catch(error:any)
{
        return NextResponse.json({error:error.message},{status:500});
}
}