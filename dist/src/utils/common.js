import { getWindowWidth } from "../primitives/platform/platform";
import { XS_BREAKING_POINT } from "./theme";
export function isObject(obj) {
    return obj && obj instanceof Object && obj.constructor === Object;
}
export var isXs = function () { return getWindowWidth() < XS_BREAKING_POINT; };
//# sourceMappingURL=common.js.map