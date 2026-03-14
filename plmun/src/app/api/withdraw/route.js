import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import jwt from 'jsonwebtoken';

export async function POST(request){
    try {
        const { auditionId } = await request.json();
        const pool = await createConnection();

        // Get token from cookies and verify user
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Verify token and get userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Delete the audition only if it belongs to the user
        const sql = "DELETE FROM audition WHERE id = ? AND user_id = ?";
        const [result] = await pool.query(sql, [auditionId, userId]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Audition not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ success: "Application withdrawn successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in withdrawal:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
