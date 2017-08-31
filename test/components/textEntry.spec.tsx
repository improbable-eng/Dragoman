/* tslint:disable:no-console */
// import { spy } from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';
import TextEntry, { ITextEntryProps} from '../../app/components/textEntry';

// const CounterAny = Counter as any;

function setup() {
  const textEntryProps: ITextEntryProps = {
    id: 'testID',
    multiline: false,
    handleChange: (newValue: string | number) => { console.log(`newValue: ${newValue}`); },
  };

  const component = shallow(<TextEntry {...textEntryProps} />);

  return {
    component,
  };
}

describe('Single line text entry component', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component.text()).toMatch('<TextField />');
  });
});
