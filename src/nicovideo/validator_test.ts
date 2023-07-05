import { validateUrlIsNicovideo } from "./validator.ts";
import { assertEquals } from "https://deno.land/std@0.188.0/testing/asserts.ts";

Deno.test("Should return true for valid Nicovideo URL", () => {
    const validUrl = "http://www.nicovideo.jp/watch/sm9";
    const result = validateUrlIsNicovideo(validUrl);
    assertEquals(result, true);
});

Deno.test(
    "Should return false for invalid Nicovideo URL (different host)",
    () => {
        const invalidUrl = "http://www.google.com/watch/sm9";
        const result = validateUrlIsNicovideo(invalidUrl);
        assertEquals(result, false);
    }
);

Deno.test("Should return false for invalid Nicovideo URL (wrong path)", () => {
    const invalidUrl = "http://www.nicovideo.jp/browse/sm9";
    const result = validateUrlIsNicovideo(invalidUrl);
    assertEquals(result, false);
});

Deno.test("Should return false for invalid URL format", () => {
    const invalidUrl = "this is not a URL";
    const result = validateUrlIsNicovideo(invalidUrl);
    assertEquals(result, false);
});
