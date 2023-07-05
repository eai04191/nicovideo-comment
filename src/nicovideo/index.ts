import { DOMParser } from "deno-dom-wasm";
import { type InitialData, type Thread } from "./type.ts";

export function getInitialDataFromHTML(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) {
        throw new Error("failed to parse html");
    }

    const scriptTag = doc.querySelector("#js-initial-watch-data");
    const data = scriptTag?.getAttribute("data-api-data");
    if (!data) {
        console.log(scriptTag);

        throw new Error("failed to get data");
    }

    return JSON.parse(data) as InitialData;
}

/**
 * 直近10000件のコメントを取得する
 */
export async function fetchComments(thread: Thread) {
    const { id, fork, server } = thread;
    const params = {
        thread: String(id),
        version: "20090904",
        scores: "0",
        fork: String(fork),
        language: "0",
        res_from: "-10000",
    };
    const query = new URLSearchParams(params);
    const response = await fetch(`${server}/api.json/thread?${query}`);
    const json = await response.json();

    return json;
}
