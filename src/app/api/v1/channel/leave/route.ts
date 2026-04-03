import { NextResponse } from "next/server";

/**
 * POST /api/v1/channel
 * 
 * Leave channel subscription
 * 
 * Auth: 
 * - Required authenticated user
 * 
 * Body (JSON):
 * - subscriptionId: string
 * 
 * @returns Updated Channel
 * 
*/
export async function POST(){
    return NextResponse.json({message: "Not Implemented!"})
}