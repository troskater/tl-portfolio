import { getProject, saveProject, deleteProject } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id
  return NextResponse.json(await getProject(id));
}

export async function POST(request, { params }) {
  // init
  const id = params.id
  const project = await request.json()

  return NextResponse.json(await saveProject(id, project))
}