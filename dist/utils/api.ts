export async function postAnswer(
    year: string,
    day: string,
    part: string,
    result: string
) {
    const sessionId = getSessionId();

    const answerResponse = await fetch(
        `https://adventofcode.com/${year}/day/${day}/answer`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: `session=${sessionId}`,
            },
            body: `level=${part}&answer=${result}`,
        }
    );
    const txt = await answerResponse.text();
    return txt;
    // .split("\n")
    // .join("")
    // .match(/<main>(.+)<\/main>/gms)?.[0];
}

export async function getPuzzle(year: string, day: string) {
    const sessionId = getSessionId();

    const puzzleResponse = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`,
        {
            credentials: "include",
            headers: {
                Cookie: `session=${sessionId}`,
            },
        }
    );

    const puzzle = await puzzleResponse.text();

    if (!puzzle) {
        console.error("Input empty, something went wrong...");
        Deno.exit();
    }

    return puzzle;
}

function getSessionId() {
    const sessionId = Deno.env.get("AOC_SESSION_COOKIE");
    if (!sessionId) {
        console.error(
            "You need to add your AOC_SESSION_COOKIE to the .env file."
        );
        Deno.exit();
    }

    return sessionId;
}
