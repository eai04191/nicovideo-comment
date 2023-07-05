import { serve } from "std/http/server.ts";
import { fetchComments, getInitialDataFromHTML } from "./nicovideo/index.ts";
import { validateUrlIsNicovideo } from "./nicovideo/validator.ts";
import { fetchHTML } from "./utils.ts";

function responseAsJSON(data: unknown, init?: ResponseInit) {
    const body = JSON.stringify(data);
    return new Response(body, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.youtube.com",
        },
    });
}

async function handleGetRequest(req: Request) {
    try {
        const url = new URL(req.url);
        const params = url.searchParams;
        const urlToFetch = params.get("url");

        if (!urlToFetch) {
            return responseAsJSON(
                { error: "url query param is required" },
                { status: 400 }
            );
        }

        if (!validateUrlIsNicovideo(urlToFetch)) {
            return responseAsJSON(
                { error: "url must be a nicovideo watch url" },
                { status: 400 }
            );
        }

        const html = await fetchHTML(urlToFetch);
        const data = getInitialDataFromHTML(html);
        const thread = data.comment.threads.find((t) => t.label === "default");
        if (!thread) {
            return responseAsJSON(
                { error: "failed to find comment thread" },
                { status: 500 }
            );
        }

        const comments = await fetchComments(thread);

        return responseAsJSON(comments);
    } catch (error) {
        console.error(error);
        return responseAsJSON(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}

serve(async (req: Request): Promise<Response> => {
    switch (req.method) {
        case "GET":
            return await handleGetRequest(req);
        default:
            return responseAsJSON(
                { error: "Method not allowed" },
                { status: 405 }
            );
    }
});
