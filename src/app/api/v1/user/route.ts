import { NextResponse } from "next/server";

/**
 * PUT /api/v1/user
 * 
 * Change user data (e.g. name)
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * @returns Updated MUser
 * 
*/
export async function PUT(){
    return NextResponse.json({message: "Not Implemented!"})
}