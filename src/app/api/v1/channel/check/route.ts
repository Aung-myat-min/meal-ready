import { NextResponse } from "next/server";

/**
 * POST /api/v1/channel/check
 * 
 * Check Channel-Code Availability
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * Body (JSON):
 * - code: String
 * 
 * @returns boolean
 * 
*/
export async function POST(){
    return NextResponse.json({message: "Not Implemented!"})
}