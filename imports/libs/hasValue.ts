export const isBoolean = (value:any) => {

    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === 'boolean' || (typeof value === 'object' && (value.toString() === 'false' || value.toString() === 'true'))) {
        return true;
    }

    return false;
};

export const hasValue = (value:any) => {
    const getTypeOf = (obj:any) => {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    };

    if (isBoolean(value)) {
        return true;
    }


    switch (getTypeOf(value)) {
        case 'undefined':
            return false;
        case 'null':
            return false;
        case 'number':
            return !isNaN(value);
        case 'object':
            return Object.keys(value).length > 0;
        case 'array':
            return value.length > 0;
        case 'string':
            return value.trim() !== '';
        default:
            return true;
    }
};
