/* tslint:disable:no-console */
// import { spy } from 'sinon';
import * as React from 'react';
import { shallow } from 'enzyme';
import { SingleLineTextEntry, ISingleLineTextEntryProps} from '../../app/components/singleLineTextEntry';

// const CounterAny = Counter as any;

function setup() {
  const singleLineTextEntryProps: ISingleLineTextEntryProps = {
    id: 'testID',
    handleChange: (newValue: string | number) => { console.log(`newValue: ${newValue}`); },
  };

  const component = shallow(<SingleLineTextEntry {...singleLineTextEntryProps} />);

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
