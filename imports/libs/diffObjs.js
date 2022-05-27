import { isEqual, isObject, transform } from "lodash";

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
// export const difference = (object, base, depth = 0) => {
//
//     return transform(object, (result, value, key) => {
//         if (!isEqual(value, base[key])) {
//             result[key] =
//                 (value && (value instanceof Date) && !isNaN(value.valueOf()))
//                     ? value
//                     : !Array.isArray(value) && isObject(value) && isObject(base[key]) && depth === 0
//                     ? difference(value, base[key], depth + 1)
//                     : (Array.isArray(value)?:value);
//         }
//     });
// };

export const difference = (object, base) =>
  transform(object, (result, value, key) => {
    if (
      !isEqual(value, base[key]) ||
      (!Array.isArray(value) &&
        isObject(value) &&
        isObject(base[key]) &&
        JSON.stringify(value) !== JSON.stringify(base[key]))
    ) {
      result[key] = value;
    }
  });
