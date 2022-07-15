const getMongoDBFilterSintaxe = (operator, value, type) => {
    if (type == 'number') {
        value = Number(value)
    }
    if (type == 'date') {
        value = new Date(value)
    }
    switch (operator) {
        case '==':
            return value
        case '!=':
            return { $ne: value }
        case 'initwith':
            return new RegExp(`^${value}.*`, 'i')
        case 'contains':
            return new RegExp(`.*${value}.*`, 'i')
        case '!contains':
            return new RegExp(`^((?!${value}).)*$`, 'i')
        case '>':
            return { $gt: value }
        case '>=':
            return { $gte: value }
        case '<':
            return { $lt: value }
        case '<=':
            return { $lte: value }
        case 'in':
            return { $in: value }
        case '!in':
            return { $nin: value }
        default:
            return value
    }
}

export default {
    getMongoDBFilterSintaxe,
}
