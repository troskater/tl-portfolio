import { getProjects, searchProjects, createProjectIndex } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request) {
  // init
  let projects = null

  // get
  try {
    projects = await getProjects()
  } catch (e) {
    await createProjectIndex()
    projects = await getProjects()
  }
  return NextResponse.json(projects);
}

export async function POST(request) {
  const q = await request.json()
  return NextResponse.json(await searchProjects(q))
}