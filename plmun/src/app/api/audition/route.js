import {createConnection} from "@/lib/db"
import {NextResponse} from "next/server"
import jwt from 'jsonwebtoken'

export async function POST(request) {
    try{
        const {year, course, phone, gender, role, why} = await request.json()
        const pool = await createConnection();

        // Get token from cookies
        const token = request.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({error:"Not authenticated"}, {status:401})
        }

        // Decode token to get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if(year === "" || course === "" || phone === "" || gender === "" || role === "" || why === "" ){
            return NextResponse.json({error:"All Fields must be filled"}, {status:400})
        }

        const sql = ("INSERT INTO audition (user_id, year, course, phone, gender, role, why) VALUES (?,?,?,?,?,?,?)")
        await pool.query(sql, [userId, year, course, phone, gender, role, why]);
        return NextResponse.json({success: "Successfully submit your audition form"}, {status:200})

    } catch(error){
        console.error("Error in Submission", error);
        return NextResponse.json({error:error.message || "Something Went Wrong"}, {status:500})
    }
}