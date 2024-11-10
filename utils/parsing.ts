import { ID } from "./types";

export function toID(id: string | ID): ID {
    if (typeof id === "string") {
        return {
            namespace: id.split(":")[0],
            path: id.split(":")[1],
        };
    } else {
        return id;
    }
}

export function toString(id: string | ID): string {
    if (typeof id === "string") {
        return id;
    } else {
        return `${id.namespace}:${id.path}`;
    }
}

export function containsValue(obj: any, targetValue: any): boolean {
    // Base case: if obj is not an object or array, return false
    if (obj === null || typeof obj !== "object") return false;

    // Iterate over the object's properties
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            // Check if the value matches the target value
            if (value === targetValue) {
                return true;
            }

            // If the value is an object or array, recurse into it
            if (typeof value === "object" && value !== null) {
                if (containsValue(value, targetValue)) {
                    return true;
                }
            }
        }
    }

    // If no match found, return false
    return false;
}
