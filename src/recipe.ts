import { containsValue, toID, toString } from "../utils/parsing";
import { ID } from "../utils/types";
import { Lectern } from "./main";

export async function getRecipes(
    this: Lectern,
    id?: string | ID,
    type?: string | ID,
    resultOnly?: boolean
): Promise<Object[]> {
    // Await `getEntries` and then use `Promise.all` to resolve all `this.jar.read` calls
    let entries = await this.jar.getEntries(``, /data\/[^\/]*\/recipes\/.*/);

    let recipes = (
        await Promise.all(
            entries.map((entry) => this.jar.read(entry)) // No need for `async` or `await` inside `map`
        )
    ).filter((recipe) => {
        if (type && recipe.type !== toString(type)) {
            return false;
        }

        if (!id) {
            return true;
        }

        let resource = toID(id);

        if (!containsValue(recipe, toString(resource))) return false;

        if (resultOnly) {
            if (typeof recipe.result === "string") {
                return toString(resource) === recipe.result;
            } else {
                return toString(resource) === recipe.result.item;
            }
        }

        return true;
    });

    return recipes;
}
