
import { async, ZipEntry} from 'node-stream-zip';


export class Jar {

    protected zip: InstanceType<typeof async>;

    constructor(jarFile: string) {
      this.zip = new async({ file: jarFile });
    }

    async getEntries(path?: string, filter?: RegExp) {
        return (Object.entries((await this.zip.entries())).filter(([key]) => {
            return key.startsWith(path ? path : "") && (filter ? filter.test(key) : true) && !key.includes(".class")
        }).map(([key, _]) => key))
    }

    async read(path: string | ZipEntry) {
        return JSON.parse((
    
            await this.zip.entryData(typeof path === "string" ? path : path.name)
        
        ).toString());
    }
      
}


//console.log(await x.getEntries())

//console.log(toID((await x.read("data/minecraft/recipes/acacia_boat.json")).type))
