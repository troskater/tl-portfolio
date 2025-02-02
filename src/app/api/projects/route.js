import { RestResponse } from "@/lib/RestResponse";

export function GET(request) {
  return RestResponse.getAll(request)
}

export function POST(request) {
  return RestResponse.search(request)
}