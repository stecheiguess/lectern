import { async, ZipEntry } from "node-stream-zip";

export class Jar {
    protected zip: InstanceType<typeof async>;

    constructor(jarFile: string) {
        this.zip = new async({ file: jarFile });
    }

    async getEntries(path?: string, filter?: string) {
        return Object.entries(await this.zip.entries())
            .filter(([key]) => {
                return (
                    key.startsWith(path ? path : "") &&
                    (filter ? RegExp(filter).test(key) : true) &&
                    !key.includes(".class")
                );
            })
            .map(([key, _]) => key);
    }

    async getDirectories(path?: string, filter?: string) {
        let entries = await this.getEntries(path, filter);

        let directories = new Set();

        entries.forEach((dir) => {
            directories.add(dir.split("/")[0]);
        });

        return Array.from(directories);
    }

    async read(path: string | ZipEntry) {
        try {
            return JSON.parse(
                (
                    await this.zip.entryData(
                        typeof path === "string" ? path : path.name
                    )
                ).toString()
            );
        } catch (err) {
            return {
                data: await this.zip.entryData(path),
            };
        }
    }
}

//console.log(await x.getEntries())

//console.log(toID((await x.read("data/minecraft/recipes/acacia_boat.json")).type))
