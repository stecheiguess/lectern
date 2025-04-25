import { getEntries } from "../files"
import { Lectern } from "../main"
import { Block } from "../types/references"
import fs from "fs/promises"

export async function getBlocks(
    this: Lectern,
    namespace: string = "minecraft"
): Promise<Block[]> {
    const blocks = await getEntries(
        `${this.basePath}/assets/${namespace}/blockstates`
    )
    return blocks
        .filter((entry) => !entry.startsWith("_"))
        .map((entry) => (entry.endsWith(".json") ? entry.slice(0, -5) : entry))
        .map((entry) => ({
            namespace: namespace,
            path: entry,
        }))
}

export async function getBlockstate(
    this: Lectern,
    block: Block
): Promise<Object[]> {
    const jsonData = await fs
        .readFile(
            `${this.basePath}/assets/${block.namespace}/blockstates/${block.path}.json`,
            "utf-8"
        )
        .then(JSON.parse)

    return jsonData
}
