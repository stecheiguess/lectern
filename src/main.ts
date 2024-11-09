import unzipper from 'unzipper'
import { async, ZipEntry} from 'node-stream-zip';
import { Jar } from './jar';
import { toID } from '../utils/parsing';
import { ID } from '../utils/types';
import { getRecipes } from './recipe';


const jar = "Minecraft Java Edition 1.20.1.jar"

export class Lectern {

  protected jar: Jar 

  constructor(jarFile: string) {
    this.jar = new Jar(jarFile)
  }

  public getRecipes = getRecipes

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

let x = new Lectern(jar)
console.log((await x.getRecipes(/*{
  namespace: "minecraft",
  path: "stone_bricks",
}*/)).length)