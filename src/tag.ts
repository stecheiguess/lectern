import { containsValue, toID, toString } from "../utils/parsing";
import { ID } from "../utils/types";
import { Lectern } from "./main";

export async function getTags(
    this: Lectern,
    id?: string | ID,
    registry?: string | ID
): Promise<Object[]> {
    // Await `getEntries` and then use `Promise.all` to resolve all `this.jar.read` calls
    let entries = (
        await this.jar.getEntries(``, `/data\/[^\/]*\/tags\/.*/`)
    ).filter((entry) => {
        if (!registry) {
            return true;
        }

        let resource = toID(registry);

        return RegExp(
            `data\/${resource.namespace}\/tags\/${resource.path}\/.*`
        ).test(entry);
    });

    let tags = (
        await Promise.all(
            entries.map((entry) => this.jar.read(entry)) // No need for `async` or `await` inside `map`
        )
    ).filter((tag) => {
        if (!id) {
            return true;
        }

        let resource = toID(id);

        if (!containsValue(tag, toString(resource))) return false;

        return true;
    });

    return tags;
}

export async function getTagTypes(this: Lectern): Promise<Object> {
    let tags = await this.jar.getDirectories(``, `/data\/[^\/]*\/tags\/.*/`);
    return tags;
}

export async function getTag(
    this: Lectern,
    id: string | ID,
    type: string
): Promise<Object | undefined> {
    let resource = toID(id);

    try {
        let tag = await this.jar.read(
            `data/${resource.namespace}/tags/${type}/${resource.path}.json`
        );

        return tag;
    } catch (err) {
        return;
    }
}
