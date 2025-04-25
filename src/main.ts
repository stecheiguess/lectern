import { getBlocks, getBlockstate } from "./handlers/block"
import { getRecipe, getRecipes } from "./handlers/recipe"

export class Lectern {
    protected basePath: string

    constructor(basePath: string) {
        this.basePath = basePath
    }

    public getBlocks = getBlocks
    public getBlockstate = getBlockstate
    public getRecipes = getRecipes
    public getRecipe = getRecipe

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

let x = new Lectern("1.21.5")
const recipes = await x.getRecipes()
console.log(await x.getRecipe(recipes[0]))

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

//console.log(await getEntries("1.21.5"))
