import {createConnection} from "@/lib/db"
import {NextResponse} from "next/server"
import jwt from 'jsonwebtoken'

export async function GET(request){
    try{
        const pool = await createConnection();
        const token = request.cookies.get('token')?.value;
        
        if(!token){
            return NextResponse.json({error:"Not authenticated"}, {status:401})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const sql = "SELECT * FROM audition WHERE user_id = ?";
        const [results] = await pool.query(sql, [userId]);

        return NextResponse.json({auditions: results}, {status:200})
    } catch(error){
        console.error("Error fetching user's audition", error);
        return NextResponse.json({error: error.message || "Something went wrong"}, {status:500})
    }
}
