import { getEntries } from "../files"
import { Lectern } from "../main"
import { Recipe } from "../types/references"
import fs from "fs/promises"

export async function getRecipes(
    this: Lectern,
    namespace: string = "minecraft"
): Promise<Recipe[]> {
    const recipes = await getEntries(
        `${this.basePath}/data/${namespace}/recipe`
    )

    return recipes
        .filter((entry) => !entry.startsWith("_"))
        .map((entry) => (entry.endsWith(".json") ? entry.slice(0, -5) : entry))
        .map((entry) => ({
            namespace: namespace,
            path: entry,
        }))
}

export async function getRecipe(
    this: Lectern,
    recipe: Recipe
): Promise<Object[]> {
    const jsonData = await fs
        .readFile(
            `${this.basePath}/data/${recipe.namespace}/recipe/${recipe.path}.json`,
            "utf-8"
        )
        .then(JSON.parse)

    return jsonData
}
