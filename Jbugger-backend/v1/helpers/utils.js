const {isPlainObject, isObject, isArray, snakeCase, camelCase, transform} = require("lodash");

function keysTo(obj, newCase = 'camel') {
    let fn = camelCase;
    if (newCase === 'snake')
        fn = snakeCase;

    if (!fn)
        return

    if (isObject(obj)) {
        console.log(obj);
        const n = {};
        Object.keys(obj).forEach(k => (n[fn(k)] = keysTo(obj[k], newCase)));
        return n;
    } else if (isArray(obj)) obj.map(it => keysTo(it, newCase));
    return obj;
}

function renameProperty(obj, fromKey, toKey) {
    obj[toKey] = obj[fromKey];
    delete obj[fromKey];
}

module.exports = {
    keysTo,
    renameProperty
}