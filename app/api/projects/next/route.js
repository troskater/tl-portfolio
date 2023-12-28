import { RestResponse } from "@/lib/RestResponse";

export function POST(request) {
  return RestResponse.getNext(request)
}