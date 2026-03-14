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

        const token = jwt.sign(
            { 
                userId: user.id,
                username: user.username 
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: '3d',
                algorithm: 'HS256'
            }
        )
        
        const response = NextResponse.json(
            { message: "Login Successfully" }, 
            { status: 200 }
        )

        // Set HTTP-only cookie for token (more secure)
        response.cookies.set('token', token, {
            httpOnly: true, // Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3, // 3 days
            path: '/'
        })

        // Set regular cookie for UI purposes
        response.cookies.set('username', user.username, {
            httpOnly: false, // Can be accessed by JavaScript for UI
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3,
            path: '/'
        })

        response.cookies.set('contactNumber', user.contact_number, {
            httpOnly: false, // Can be accessed by JavaScript for UI
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3,
            path: '/'
        })  

        response.cookies.set('email', user.email, {
            httpOnly: false, // Can be accessed by JavaScript for UI
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3,
            path: '/'
        })

        return response

    } catch(error) {
        console.error('Login error:', error);
        return NextResponse.json({error: error.message || "Something Went Wrong!"}, {status: 500})
    }
}