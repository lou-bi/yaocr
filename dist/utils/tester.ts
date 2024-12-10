import { join } from "@std/path/join";
import { getExerciceFolder } from "./utils.ts";

export async function test(year: string, day: string, part: string = "") {
    const cArgs = ["test", join(getExerciceFolder(), year, day), "--allow-all"];
    if (part) {
        cArgs.push("--", "-p", part);
    }

    const command = new Deno.Command(Deno.execPath(), {
        args: cArgs,
        stdout: "piped",
        stderr: "piped",
    });
    const proc = command.spawn();
    proc.stdout.pipeTo(Deno.stdout.writable);
    proc.stderr.pipeTo(Deno.stderr.writable);
    const status = await proc.status;
    console.log(status);
}
