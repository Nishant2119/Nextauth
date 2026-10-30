import {NextRequest , NextResponse} from 'next/server';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModels';

connect();

export async function POST(request:NextRequest)
{
    try
    {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token)

     const user =   await  User.findOne({verifyToken:token});

        if(!user)
        {
            return NextResponse.json({error:"Invalid user"},
                {status:400}
            )
        }
        else if(user.verifyTokenExpiry <= Date.now())
        {
            return NextResponse.json({error:"Verification failed please retry"},{status:402});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            success:true
        })
    }
    catch(error:any)
    {
        return NextResponse.json({error:error.message},
            {status:500}
        );
    }
}