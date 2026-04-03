import { NextResponse } from "next/server";

/**
 * POST /api/v1/subscribe
 * 
 * Joining a channel subscription
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * @returns boolean
 * 
*/
export async function POST(){
    return NextResponse.json({message: "Not Implemented!"})
}