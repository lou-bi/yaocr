import { parseArgs } from "@std/cli/parse-args";
import { getExerciceFolder } from "./utils/utils.ts";
import { scaffold } from "./utils/scaffolder.ts";
import { test } from "./utils/tester.ts";
import { postAnswer } from "./utils/api.ts";

if (import.meta.main) {
    const args = parseArgs(Deno.args, {
        string: ["year", "day", "part"],
        boolean: ["help", "init", "test"],
        alias: {
            y: "year",
            d: "day",
            p: "part",
            t: "test",
            i: "init",
            h: "help",
        },
        default: {
            year: String(new Date().getFullYear()),
            day: String(new Date().getDate()),
        },
    });
    if (args.help) {
        console.log("--help not implemented");
        Deno.exit();
    }
    if (args.init) {
        await scaffold(args.year, args.day);
        Deno.exit();
    }
    if (args.test) {
        await test(args.year, args.day, args.part);
        Deno.exit();
    }

    if (!args.part) {
        console.error("\nPlease specify --part(-p) <1|2>");
        Deno.exit();
    }

    const { part1, part2, inputParser } = await import(
        `./${getExerciceFolder()}/${args.year}/${args.day}/main.ts`
    );

    const AOCInput = await Deno.readTextFile(
        `./${getExerciceFolder()}/${args.year}/${args.day}/input.txt`
    );
    const parsedInput = inputParser(AOCInput);

    let result;

    if (args.part === "1") {
        const t1 = performance.now();
        result = part1(parsedInput);
        const t2 = performance.now();
        const tt = `${t2 - t1}ms`;
        console.log("Part #1 done in:", tt);
    } else if (args.part === "2") {
        const t1 = performance.now();
        result = part2(parsedInput);
        const t2 = performance.now();
        const tt = `${t2 - t1}ms`;
        console.log("Part #2 done in:", tt);
    }
    console.log("\nResult:", result);

    if (confirm("Do you want to send your response?")) {
        const ans = await postAnswer(args.year, args.day, args.part, result);
        console.log(ans);
    }
}
