import { join as pathJoin } from "jsr:@std/path@1.0.8";
import { getPuzzle } from "./api.ts";
import { getExerciceFolder } from "./utils.ts";

export async function scaffold(year: string, day: string) {
    const destFolder = pathJoin(getExerciceFolder(), year, day);
    try {
        await Deno.lstat(destFolder);
        console.error(`Folder ${destFolder} already exists`);
        Deno.exit();
    } catch (_e) {
        /**/
    }

    const puzzleInput = await getPuzzle(year, day);

    await Deno.mkdir(destFolder, { recursive: true });

    // ... and files
    const templateFolder = pathJoin("lib", "template");
    const templateMain = await Deno.readTextFile(
        pathJoin(templateFolder, "main.ts")
    );
    const templateMainTest = await Deno.readTextFile(
        pathJoin(templateFolder, "main_test.ts")
    );
    const templateEnvExample = await Deno.readTextFile(
        pathJoin(templateFolder, ".env.example")
    );

    const destInput = pathJoin(destFolder, "input.txt");
    const destEnv = pathJoin(destFolder, ".env");
    const destMain = pathJoin(destFolder, "main.ts");
    const destMainTest = pathJoin(destFolder, "main_test.ts");

    await Promise.all([
        Deno.writeTextFile(destInput, puzzleInput.trim()),
        Deno.writeTextFile(destEnv, templateEnvExample),
        Deno.writeTextFile(
            destMain,
            templateMain.replaceAll(/<yyyy>/g, year).replaceAll(/<ddd>/g, day)
        ),
        Deno.writeTextFile(
            destMainTest,
            templateMainTest
                .replaceAll(/<yyyy>/g, year)
                .replaceAll(/<ddd>/g, day)
        ),
    ]);
}
