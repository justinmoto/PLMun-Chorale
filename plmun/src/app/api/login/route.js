import {createConnection} from "@/lib/db"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function POST(request){
    try {
        const {username,password} = await request.json()
        const pool = await createConnection();

        const sql = "SELECT * FROM users WHERE username = ?"
        const [users] = await pool.query(sql, [username])

        if (users.length === 0){
            return NextResponse.json({error:"No User Found"}, {status: 400})
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
            return NextResponse.json({error:"Invalid Password"}, {status: 400})
        }

        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET, {expiresIn: '3d'})
        return NextResponse.json({message:"Login Successfully", token, username: user.username}, {status: 200})

    } catch(error) {
        console.error('Login error:', error);
        return NextResponse.json({error: error.message || "Something Went Wrong!"}, {status: 500})
    }
}