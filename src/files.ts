import fg from "fast-glob"

type MatchOptions = {
    regex?: RegExp
}

export async function getEntries(
    inputPath: string,
    options: MatchOptions = {}
): Promise<string[]> {
    const { regex } = options

    const entries = await fg(["**/*"], {
        cwd: inputPath,
        onlyFiles: true,
        absolute: false,
    })

    return regex ? entries.filter((filePath) => regex.test(filePath)) : entries
    //.map((entry) => entry.name)
}
