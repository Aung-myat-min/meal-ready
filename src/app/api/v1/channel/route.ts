import { NextResponse } from "next/server";

/**
 * PUT /api/v1/channel
 * 
 * Update channel data (e.g. name)
 * 
 * Auth: 
 * - Required authenticated user & owner status
 * 
 * @returns Updated Channel
 * 
*/
export async function PUT(){
    return NextResponse.json({message: "Not Implemented!"})
}

/**
 * POST /api/v1/channel
 * 
 * Create new channel
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * @returns Channel
 * 
*/
export async function POST(){
    return NextResponse.json({message: "Not Implemented!"})
}