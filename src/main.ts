import unzipper from "unzipper";
import { async, ZipEntry } from "node-stream-zip";
import { Jar } from "./jar";
import { toID } from "../utils/parsing";
import { ID } from "../utils/types";
import { getRecipes } from "./recipe";
import { getBlockModel, getBlockModels } from "./model";
import { getTag, getTags, getTagTypes } from "./tag";
import { getData } from "./data";

const jar = "Minecraft Java Edition 1.20.1.jar";

export class Lectern {
    protected jar: Jar;

    constructor(jarFile: string) {
        this.jar = new Jar(jarFile);
    }

    public getRecipes = getRecipes;
    public getBlockModels = getBlockModels;
    public getTags = getTags;
    public getTagTypes = getTagTypes;
    public getTag = getTag;
    public getBlockModel = getBlockModel;
    public getData = getData;

    /* async getTextures(id: string | ID): Promise<Object[]> {
    let resource = toID(id);

    // Await `getEntries` and then use `Promise.all` to resolve all `this.jar.read` calls
    let entries = await this.jar.getEntries(`data/${resource.namespace}/recipes/`, resource.path);
    let recipes = await Promise.all(
        entries.map(entry => this.jar.read(entry))  // No need for `async` or `await` inside `map`
    );

    return recipes;
  }*/
}

let x = new Lectern(jar);
// console.log(
//     await x.getRecipes({
//         namespace: "minecraft",
//         path: "tripwire_hook",
//     })
// );

/*console.log(
    await x.getBlockModels({
        namespace: "minecraft",
        path: "warped_door",
    })
);*/

//console.log(await x.getTags(undefined, "minecraft:blocks/mineable"));

/*console.log(await x.getTag("minecraft:wool", "blocks"));
console.log(await x.getBlockModel("minecraft:white_wool"));
console.log(await x.getBlockModel("minecraft:template_anvil"));
*/

console.log(await x.getData("minecraft:white_wool"));
