import { NextResponse } from "next/server";
import callExternalApi from "@/lib/callExternalApi";
import { query } from '@/lib/db';

const KMDB_API_BASE_URL = process.env.KMDB_API_BASE_URL;
const KMDB_API_SERVICE_KEY = process.env.KMDB_API_SERVICE_KEY;

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const listCount = searchParams.get("listCount") || 20;
  const kmdbApi = callExternalApi({
    baseURL: KMDB_API_BASE_URL,
  });

  try {
    const params = {
        ServiceKey: KMDB_API_SERVICE_KEY,
        listCount: listCount,
    };

    if (query) {
      params.title = query;
    }

    const data = await kmdbApi.get("", { params });

    return NextResponse.json(data);
  } catch (error) {
    console.error("KMDB API 호출 실패:", error.message, error.stack);
    return NextResponse.json(
      { error: "KMDB API 호출 실패", details: error.message },
      { status: 500 }
    );
  }
}
