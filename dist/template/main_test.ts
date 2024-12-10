import { assertEquals } from "@std/assert/equals";
import { join } from "@std/path/join";
import { parseArgs } from "@std/cli/parse-args";

const args = parseArgs(Deno.args, {
    string: ["part"],
    alias: { p: "part" },
});

const { part1, part2, inputParser } = await import(
    join(import.meta.dirname!, "main.ts")
);

Deno.test({
    name: "Year <yyyy>, day <ddd>, Part 1",
    only: args.part === "1",
    fn() {
        const expected1 = 0;
        const inputExample1 = inputParser(`
/**
 * Your example here
 */
        `);

        assertEquals(part1(inputExample1), expected1);
    },
});

Deno.test({
    name: "Year <yyyy>, day <ddd>, Part 2",
    only: args.part === "2",
    fn() {
        const expected1 = 0;
        const inputExample1 = inputParser(`
/**
 * Your example here
 */
        `);

        assertEquals(part2(inputExample1), expected1);
    },
});
