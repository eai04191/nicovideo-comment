export function validateUrlIsNicovideo(url: string) {
    try {
        const { host, pathname } = new URL(url);
        const isNicovideo = host === "www.nicovideo.jp";
        const isVideo = pathname.startsWith("/watch/");

        return isNicovideo && isVideo;
    } catch {
        return false;
    }
}
