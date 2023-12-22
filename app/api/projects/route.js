import { toJSON } from "@/lib/helpers";
import { getProjects, searchProjects, createProjectIndex } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request) {
  // get projects
  let q = request.url.split('?')[1]

  if ('index' == q) {
    // update search index
    await createProjectIndex()

    return NextResponse.json(true)
  } else {
    // get all projects
    let projects = await getProjects()
    // console.log(projects)

    return NextResponse.json(projects)
  }
}

export async function POST(request) {
  // get projects
  const q = await request.json()
  let projects = await searchProjects(q)
  // console.log(projects);

  return NextResponse.json(projects)
}