import { db } from "@/lib/redis";
import { NextResponse } from "next/server";
import { singularize } from "./helpers";

export class RestResponse {
  static #getTable(name) {
    return db[name]
  }

  static #getEndpoint(request) {
    // init rest response
    const url = request.url.split('?')[0].split('/api/')
    const path = url[1].split('/')
    return singularize(path[0])
  }

  static #getTableFromRequest(request) {
    return RestResponse.#getTable(RestResponse.#getEndpoint(request))
  }

  static async getAll(request) {
    // init
    const table = RestResponse.#getTableFromRequest(request)
    const q = request.url.split('?')[1]

    if ('index' == q) {
      // update search index
      await table.createIndex()

      return NextResponse.json(true)
    } else {
      // get all items
      let items = await table.getAll()
      // console.log(items)

      return NextResponse.json(items)
    }
  }

  static async search(request) {
    // init
    const table = RestResponse.#getTableFromRequest(request)

    // get items
    const q = await request.json()
    let items = await table.search(q)
    // console.log(items)

    return NextResponse.json(items)
  }

  static async get(request, params) {
    // init
    const table = RestResponse.#getTableFromRequest(request)
    const id = params.id

    return NextResponse.json(await table.get(id));
  }

  static async save(request, params) {
    // init
    const table = RestResponse.#getTableFromRequest(request)

    // init
    const id = params ? params.id : false
    const item = await request.json()

    return NextResponse.json(await table.save(item, id))
  }
}