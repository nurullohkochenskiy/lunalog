import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  return NextResponse.json({
    status: 200,
    req,
    message: "Data has been updated",
  });
}
