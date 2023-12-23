import { RestResponse } from "@/lib/RestResponse";

export function GET(request, { params }) {
  return RestResponse.get(request, { params })
}

export function POST(request, { params }) {
  return RestResponse.save(request, { params })
}