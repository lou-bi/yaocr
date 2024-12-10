export function logTitle(aoc: string) {
    let title = ` Computing Advent of Code #${aoc} `;
    const len = title.length;
    let empty = " ".repeat(len);
    const border = 3;
    title = title.padStart(len + border, "#").padEnd(len + border * 2, "#");
    empty = empty.padStart(len + border, "#").padEnd(len + border * 2, "#");
    const full = "#".repeat(title.length);

    console.log();
    console.log(full);
    console.log(empty);
    console.log(title);
    console.log(empty);
    console.log(full);
    console.log();
}

export function getExerciceFolder() {
    return Deno.env.get("FOLDER") || "adventOfCode";
}
