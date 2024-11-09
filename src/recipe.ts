import { containsValue, toID, toString } from "../utils/parsing";
import { ID } from "../utils/types";
import { Lectern } from "./main";


export async function getRecipes(
    this: Lectern, 
    id?: string | ID,
    type?: string | ID,
): Promise<Object[]> {
    
    let resource : ID = id ? toID(id) : {
        namespace: "minecraft",
        path: "",
    };

    // Await `getEntries` and then use `Promise.all` to resolve all `this.jar.read` calls
    let entries = await this.jar.getEntries(``, /data\/[^\/]*\/recipes\/.*/);

    console.log(entries)
    
    let recipes = (await Promise.all(
        entries.map(entry => this.jar.read(entry))  // No need for `async` or `await` inside `map`
    )).filter(
        (recipe) => {
       /*if (typeof recipe.result === "string") {
            return toString(resource) == recipe.result
        } else { 
            return toString(resource) == recipe.result.item
        }*/
        if (id) {
            return containsValue(recipe, toString(resource))
        } else {return true}
        
    });


    return recipes;
  }

