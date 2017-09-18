// import * as React from 'react';
// import { shallow } from 'enzyme';
// import TextEntry, { ITextEntryProps } from '../../app/components/textEntry';
// import { SETTINGS_IDS } from '../../app/reducers/settingsData';

// function setup() {
//   const singleLineTExtEntryProps: ITextEntryProps = {
//     id: SETTINGS_IDS.ENDPOINT,
//     value: 'value',
//     label: 'label',
//     placeholder: 'placeholder',
//     errorText: 'errorText',
//     required: true,
//     error: false,
//     handleChange: (id: string, newValue: string | number) => { console.log(id, newValue); }, //tslint:disable-line
//     handleDoubleClick: () => { console.log('doubleClicked'); }, //tslint:disable-line
//   };

//   const component = shallow(<TextEntry { ...singleLineTExtEntryProps } />);

//   return {
//     component,
//   };
// }

// describe('Counter component', () => {
//   it('should should display count', () => {
//     const { component } = setup();
//     expect(component).toMatch(/^1$/);
//   });
// });
