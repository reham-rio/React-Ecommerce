import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const users = [
    { id: 1, name: "moty" },
    { id: 2, name: "kooky" },
  ];

  return NextResponse.json({ users, status: 200 });
}
