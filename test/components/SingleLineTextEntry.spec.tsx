// import { spy } from "sinon";
// import * as React from "react";
// import { shallow } from "enzyme";
// import { SingleLineTextEntry, ISingleLineTextEntryProps} from "../../app/components/SingleLineTextEntry";

// // const CounterAny = Counter as any;

// function setup() {
//   const singleLineTExtEntryProps: ISingleLineTextEntryProps = {
//     id: string;
//     value?: string | number;
//     label?: string;
//     placeholder?: string;
//     errorText?: string;
//     required?: boolean;
//     error?: boolean;
//     handleChange: (id: string, newValue: string | number) => void;
//     handleDoubleClick?: () => void;
//     handleBlur?: (id: string) => void;
//   };

//   const component = shallow(<SingleLineTextEntry {...singleLineTExtEntryProps} />);

//   return {
//     component,
//     actions,
//     buttons: component.find("button"),
//     p: component.find(".counter")
//   };
// }

// describe("Counter component", () => {
//   it("should should display count", () => {
//     const { p } = setup();
//     expect(p.text()).toMatch(/^1$/);
//   });

//   it("should first button should call increment", () => {
//     const { buttons, actions } = setup();
//     buttons.at(0).simulate("click");
//     expect(actions.increment.called).toBe(true);
//   });

//   it("should second button should call decrement", () => {
//     const { buttons, actions } = setup();
//     buttons.at(1).simulate("click");
//     expect(actions.decrement.called).toBe(true);
//   });

//   it("should third button should call incrementIfOdd", () => {
//     const { buttons, actions } = setup();
//     buttons.at(2).simulate("click");
//     expect(actions.incrementIfOdd.called).toBe(true);
//   });

//   it("should fourth button should call incrementAsync", () => {
//     const { buttons, actions } = setup();
//     buttons.at(3).simulate("click");
//     expect(actions.incrementAsync.called).toBe(true);
//   });
// });
