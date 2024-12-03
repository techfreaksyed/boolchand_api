
export function convertKeysToLowerCaseInArray(arr: any[]) {
    return arr.map((obj: any) => {
        const newObj: any = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key.toLowerCase()] = obj[key];
            }
        }
        return newObj;
    });
}

export function addIdToObjects(arr: any[]): any[] {
    return arr.map((obj, index) => ({
        ...obj,
        id: index + 1, // Adjust the ID generation logic as needed
    }));
}