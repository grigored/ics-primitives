import { getNestedField } from '../../utils/common';
import { GlobalState, FormData } from './FormComponents.types';

export function getFormValues( formData: FormData, onlyTouchedFields: boolean = true ) {
    let formValues = {}, fields = formData && formData.values || {};
    Object.keys( fields ).filter(
        key =>
            onlyTouchedFields
                ? getNestedField( formData, ['fields', key, 'touched'] )
                : true
    ).map(
        key => {
            if (fields[key] !== null && fields[key] !== undefined) {
                if (key.indexOf( '!' ) !== -1) {
                    formValues = unpackJson( formValues, key, fields[key] );
                } else if (key.indexOf( '~' ) === -1) {
                    formValues = unpackForm( formValues, key, fields[key] );
                } else {
                    formValues = unpackMultipleField( formValues, key, fields[key] )
                }
            }
            formValues = initFormArray( formValues, key )
        }
    );
    clearLists( formValues );
    return formValues;
}

export function getFormDbValue( state: GlobalState, formName: string, field: string ): any {
    if (!!state.form[formName] && !!state.form[formName].values) {
        if (!!state.form[formName].values![field]) {
            return state.form[formName].values![field];
        }
        for (let fieldName in state.form[formName].values!) {
            if (fieldName.split( "~" ).indexOf( field ) !== -1) {
                if (state.form[formName].values![fieldName] && state.form[formName].values![fieldName]) {
                    return state.form[formName].values![fieldName][field];
                }
                return null;
            }
        }
    }
    return null;
}

function unpackMultipleField( root: any, s: any, value: any ) {
    root = { ...root, ...value };
    return root;
}

function unpackJson( root: any, s: any, value: any ) {
    root[s.split( '!' )[0]] = value;
    return root;
}

function unpackForm( root: any, s: any, value: any ) {
    let last = 0, key;
    let elem = root, index;
    for (index = 0; index < s.length; index++) {
        if (s[index] === ',' || s[index] === '.') {
            key = s.substring( last, index );
            last = index + 1;
            if (!elem[key]) {
                elem[key] = s[index] === ',' ? [] : {};
            }
            elem = elem[key];
        }
    }
    key = s.substring( last, index );
    elem[key] = value;
    return root;
}

function initFormArray( root: any, s: any ) {
    let last = 0, key;
    let elem = root, index;
    for (index = 0; index < s.length; index++) {
        if (s[index] === ',' || s[index] === '.') {
            key = s.substring( last, index );
            last = index + 1;
            if (!elem[key]) {
                if (s[index] === ',') {
                    elem[key] = [];
                }
                else {
                    return;
                }
            }
            elem = elem[key];
        }
    }
    return root;
}

function clearLists( formValues: any ) {
    if (formValues === null) {
        return;
    }
    for (let k in formValues) {
        if (formValues[k] instanceof Array) {
            formValues[k] = formValues[k].filter( ( v: any ) => v !== null )
        }
        else if (formValues[k] instanceof Object) {
            clearLists( formValues[k] )
        }
    }
}

export function getFormFieldContent( field: string, values: any, isRequired: boolean, alwaysTouched: boolean ) {

    let dbValue: any;
    if (field.indexOf( '~' ) > -1) {
        dbValue = {};
        field.split( '~' ).forEach( oneField => {
            dbValue[oneField] = values[oneField];
        } );
    } else {
        dbValue = values[field];
    }
    return dbValue;
}