import { RestResponse } from "@/lib/RestResponse";

export function GET(request, { params }) {
  return RestResponse.getBySlug(request, params)
}