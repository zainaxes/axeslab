import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    let parsed: URL;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return new NextResponse("Invalid url", { status: 400 });
    }

    // Only allow media from verified design prompt sources
    const allowedHosts = [
      "meez.design",
      "heydesign.ai",
      "images.unsplash.com",
      "assets.zainaxes.com",
    ];

    const isAllowed = allowedHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    );

    if (!isAllowed) {
      return new NextResponse("Forbidden host", { status: 403 });
    }

    // Forward range headers for video streaming
    const rangeHeader = request.headers.get("range");
    const fetchHeaders: HeadersInit = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      Accept: "*/*",
    };

    if (rangeHeader) {
      fetchHeaders["Range"] = rangeHeader;
    }

    const upstreamResponse = await fetch(targetUrl, {
      headers: fetchHeaders,
      cache: "force-cache",
    });

    if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
      return new NextResponse(`Upstream responded with ${upstreamResponse.status}`, {
        status: upstreamResponse.status,
      });
    }

    const contentType = upstreamResponse.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstreamResponse.headers.get("content-length");
    const contentRange = upstreamResponse.headers.get("content-range");
    const acceptRanges = upstreamResponse.headers.get("accept-ranges") || "bytes";

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", contentType);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Cross-Origin-Resource-Policy", "cross-origin");
    responseHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
    responseHeaders.set("Accept-Ranges", acceptRanges);

    if (contentLength) responseHeaders.set("Content-Length", contentLength);
    if (contentRange) responseHeaders.set("Content-Range", contentRange);

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return new NextResponse(`Media proxy error: ${error?.message || "unknown"}`, { status: 500 });
  }
}
