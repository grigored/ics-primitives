import * as Enzyme from "enzyme";
import { mount } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react'
import { FIELD_MUST_BE_NUMBER } from "../../../../../src/utils/strings";
import { TextInput } from "src/nativeComponents/TextInput/TextInput";
import { TEXT_INPUT_TYPES } from "src/utils/enums";

Enzyme.configure( { adapter: new Adapter() } );

describe( '<TextInput />', () => {
    it( 'renders', () => {
        const wrapper = mount(
            <TextInput
                onChange={() => {}}
                inputType={TEXT_INPUT_TYPES.TEXT}
            />
        );
        expect( wrapper ).toMatchSnapshot();
    } );

    it( 'returns entered string', () => {
        let x = '';
        const wrapper = mount(
            <TextInput
                onChange={( value: any ) => x = value}
                inputType={TEXT_INPUT_TYPES.TEXT}
            />
        );

        const input: any = wrapper.find( 'input' );
        input.instance().value = 'First';
        input.simulate( 'change', input );
        expect( x ).toBe( 'First' );
    } );

    it( 'properly checks floats', () => {

        let x = '';
        const wrapper = mount(
            <TextInput
                onChange={( value: any ) => x = value}
                inputType={TEXT_INPUT_TYPES.FLOAT}
            />
        );
        const input: any = wrapper.find( 'input' );

        input.instance().value = '123';
        input.simulate( 'change', input );
        expect( x ).toBe( 123 );

        input.instance().value = '123.5';
        input.simulate( 'change', input );
        expect( x ).toBe( 123.5 );

        input.instance().value = '123.5.';
        input.simulate( 'change', input );
        expect( x['error'] ).toBe( FIELD_MUST_BE_NUMBER );
    } );

    it( 'initialises from value & uses rawToDb and dbToRaw the way it should', () => {
        let x = '';
        const wrapper = mount(
            <TextInput
                value={"123"}
                rawToDb={value => +value + 1}
                dbToRaw={value => ( value - 1 ).toString()}
                onChange={( value: any ) => x = value}
                inputType={TEXT_INPUT_TYPES.FLOAT}
            />
        );
        const input: any = wrapper.find( 'input' );
        expect( input.instance().value ).toBe( "122" );

        input.instance().value = '213';
        input.simulate( 'change', input );
        expect( x ).toBe( 214 );
    } );
} );