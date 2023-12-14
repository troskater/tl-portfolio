import { saveProject } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(request) {
  // init
  const project = await request.json()
  return NextResponse.json(await saveProject(project))
}