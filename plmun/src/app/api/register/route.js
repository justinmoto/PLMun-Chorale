import {createConnection} from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request){
    try {
        const {username, email, password, contact_number, confirmPassword} = await request.json()
        const pool = await createConnection();
        
        if (password !== confirmPassword) {
           return NextResponse.json({error: "Password Not Match"}, {status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = ("INSERT INTO users (username, email, password, contact_number, created_at) VALUES (?,?,?,?,NOW())")
        await pool.query(sql, [username, email, hashedPassword, contact_number]);
        return NextResponse.json({success: "Successfully Registered a Account"}, {status:200})

    } catch(error) {
        console.error('Registration error:', error);
        return NextResponse.json({error: error.message || "Something went wrong!"}, {status: 500})
    }
}