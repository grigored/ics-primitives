import {getWindowWidth} from "../primitives/platform/platform";
import {XS_BREAKING_POINT} from "./theme";

export function isObject(obj: any): boolean {
    return obj && obj instanceof Object && obj.constructor === Object;
}

export const isXs = () => getWindowWidth() < XS_BREAKING_POINT;

