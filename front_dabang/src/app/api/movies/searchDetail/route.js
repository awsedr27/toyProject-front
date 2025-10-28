import { NextResponse } from "next/server";
import callExternalApi from "@/lib/callExternalApi";

const TMDB_API_BASE_URL = process.env.TMDB_API_BASE_URL;
const TMDB_API_SERVICE_KEY = process.env.TMDB_API_SERVICE_KEY;
export async function POST(req) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const query = body.query;
  const tmdbApi = callExternalApi({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_SERVICE_KEY}`
    }
  });
  try {
    const params = {
      language : 'ko',
    };
    if (query) {
      params.query = query;
    }else{
      params.query = '좀비';
    }

    console.log(params);
    const data = await tmdbApi.get(TMDB_API_BASE_URL,{ params });
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB API 호출 실패:", error.message, error.stack);
    return NextResponse.json(
      { error: "TMDB API 호출 실패", details: error.message },
      { status: 500 }
    );
  }
}
