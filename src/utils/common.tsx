import { getStorage, getWindowWidth } from '../primitives/platform/platform';
import { persistStore } from 'redux-persist'
import { XS_BREAKING_POINT } from './theme';

export { autoRehydrate } from 'redux-persist'

export function isObject( obj: any ): boolean {
    return obj && obj instanceof Object && obj.constructor === Object;
}

export const isXs = () => getWindowWidth() < XS_BREAKING_POINT;


export function getNestedField( obj: any, fieldNames: Array<string | number> ): any {
    let currentField = obj;
    for (let fieldName of fieldNames) {
        if (currentField === null || currentField === undefined) {
            return null;
        }
        currentField = currentField[fieldName];
    }
    return currentField;
}

export function shallowEqual( a: { [key: string]: any }, b: { [key: string]: any } ): boolean {
    return objectsEqual(a, b) && objectsEqual(b, a);
}

function objectsEqual( a: { [key: string]: any }, b: { [key: string]: any } ): boolean {
    if (!!a !== !!b) {
        return false;
    }

    for (let key in a) {
        if (!(key in b) || a[key] !== b[key]) {
            if (isObject(a[key]) && isObject(b[key])) {
                if (!shallowEqual(a[key], b[key])) {
                    return false;
                }
            }
            else if (!Array.isArray(a[key]) && !Array.isArray(b[key]) || !arraysEqual(a[key], b[key])) {
                return false;
            }
        }
    }
    return true;
}

function arraysEqual( arr1: Array<any>, arr2: Array<any> ) {
    arr1 = arr1 || [];
    arr2 = arr2 || [];
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (isObject(arr1[i]) && isObject(arr2[i])) {
            if (!shallowEqual(arr1[i], arr2[i])) {
                return false;
            }
        }
        else if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

export const getPersistStore = (store: any) => {
    persistStore(store, {
        storage: getStorage(),
        whitelist: ['persisted'],
        blacklist: ['map'],
    });
};
