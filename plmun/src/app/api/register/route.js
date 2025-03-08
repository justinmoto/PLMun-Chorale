import {createConnection} from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request){
    try {
        const {username, email, password, confirmPassword} = await request.json()
        const pool = await createConnection();
        
        if (password !== confirmPassword) {
           return NextResponse.json({error: "Password Not Match"}, {status:400})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = ("INSERT INTO users (username, email, password, created_at) VALUES (?,?,?,NOW())")
        await pool.query(sql, [username, email, hashedPassword]);
        return NextResponse.json({success: "Successfully Registered a Account"}, {status:200})

    }
    catch(error){
        return NextResponse.json({error: "Something went wrong!"}, {status: 500})
    }
}