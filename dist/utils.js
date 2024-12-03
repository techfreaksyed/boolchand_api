export function convertKeysToLowerCaseInArray(arr) {
    return arr.map((obj) => {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key.toLowerCase()] = obj[key];
            }
        }
        return newObj;
    });
}
export function addIdToObjects(arr) {
    return arr.map((obj, index) => (Object.assign(Object.assign({}, obj), { id: index + 1 })));
}
