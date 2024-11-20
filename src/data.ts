import { Lectern } from "./main";
import { ID } from "../utils/types";
import { toID } from "../utils/parsing";

export async function getData(this: Lectern, id: string | ID) {
    let resource = toID(id);

    let entries = await this.jar.getEntries(
        ``,
        `(.*)\/${resource.namespace}\/.*\/${resource.path}\\.(.*)`
    );

    let data = Object.fromEntries(
        await Promise.all(
            entries.map(async (entry) => [entry, await this.jar.read(entry)])
        )
    );

    return data;
}
