import { NextResponse } from "next/server";

/**
 * GET /api/v1/status
 * 
 * Get Subscribed Channel Status
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * @returns Status
 * 
*/
export async function GET(){
    return NextResponse.json({message: "Not Implemented!"})
}

/**
 * PUT /api/v1/status
 * 
 * Updated Subscribed Channel Status
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * @returns Status
 * 
*/
export async function PUT(){
    return NextResponse.json({message: "Not Implemented!"})
}