import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(request:NextRequest) {
    try {
        const {email, password} = await request.json();

        // validate request data
        if(!email || !password){
            return NextResponse.json(
                {error: "Email and password are required."},
                {status: 400}
            )
        }

        await connectDB();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User already Exists."},
                {status: 409}
            );
        }

        await User.create({
            email,
            password
        })
        return NextResponse.json(
                {message: "User successfully registered."},
                {status: 200}
        );

    } catch (error) {
        console.error("Registeration error: ", error)
        return NextResponse.json(
                {error: "Failed to register user."},
                {status: 400}
            );
    }
}

