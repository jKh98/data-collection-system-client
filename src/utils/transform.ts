import { isNil, isObject, transform } from "lodash";

export const removeDeepEmpty = (obj: any) =>
  transform(obj, (result: any, value, key) => {
    if (!isNil(value)) {
      result[key] = isObject(value) ? removeDeepEmpty(value) : value;
    }
  });
