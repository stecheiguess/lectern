export type Reference = {
    namespace: string
    path: string
}

export type Block = Reference & { __type?: "block" }
export type Item = Reference & { __type?: "item" }
export type Recipe = Reference & { __type?: "recipe" }

export function formatRef(ref: Reference): string {
    return `${ref.namespace}:${ref.path}`
}
