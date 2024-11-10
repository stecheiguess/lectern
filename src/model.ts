import { containsValue, toID, toString } from "../utils/parsing";
import { ID } from "../utils/types";
import { Lectern } from "./main";

export async function getBlockModels(
    this: Lectern,
    id?: string | ID,
    parent?: string | ID
): Promise<Object[]> {
    let entries = (
        await this.jar.getEntries(``, /assets\/[^\/]*\/models\/block\/.*/)
    ).filter((entry) => {
        if (!id) {
            return true;
        }

        let resource = toID(id);

        return new RegExp(
            `assets\/${resource.namespace}\/models\/block\/${resource.path}.*`
        ).test(entry);
    });

    console.log(entries);

    let models = (
        await Promise.all(
            entries.map((entry) => this.jar.read(entry)) // No need for `async` or `await` inside `map`
        )
    ).filter((model) => {
        if (parent && model.parent !== toString(parent)) {
            return false;
        }

        return true;
    });

    return models;
}

export async function getItemModels(
    this: Lectern,
    id?: string | ID,
    type?: string | ID,
    resultOnly?: boolean
): Promise<Object[]> {
    let entries = await this.jar.getEntries(``, /assets\/[^\/]*\/models\/.*/);
    console.log(entries);

    let models = (
        await Promise.all(
            entries.map((entry) => this.jar.read(entry)) // No need for `async` or `await` inside `map`
        )
    ).filter((model) => {
        if (type && model.type !== toString(type)) {
            return false;
        }

        if (!id) {
            return true;
        }

        let resource = toID(id);

        if (!containsValue(model, toString(resource))) return false;

        if (resultOnly) {
            if (typeof model.result === "string") {
                return toString(resource) === model.result;
            } else {
                return toString(resource) === model.result.item;
            }
        }

        return true;
    });

    return models;
}
