import {createConnection} from "@/lib/db"
import {NextResponse} from "next/server"

export async function POST(request) {
    try{
        const {year, course, phone, gender, role, why} = await request.json()
        const pool = await createConnection();

        if(year === "" || course === "" || phone === "" || gender === "" || role === "" || why === "" ){
            return NextResponse.json({error:"All Fiels must filled"}, {status:400})
        }

        const sql = ("INSERT INTO audition (year, course, phone, gender, role, why) VALUES (?,?,?,?,?,?)")
        await pool.query(sql, [year, course, phone, gender, role, why]);
        return NextResponse.json({success: "Successfully submit your audition form"}, {status:200})

    } catch(error){
        console.error("Error in Submition", error);
        return NextResponse.json({error:error.message || "Something Went Wrong"}, {status:500})
    }
}