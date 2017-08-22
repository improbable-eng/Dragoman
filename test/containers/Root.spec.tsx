import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
// import { Provider } from "react-redux";
// import { ConnectedRouter } from "react-router-redux";
import Root from "../../app/containers/Root";
// import { IState } from "../../app/reducers";

// const RootAny = Root as any;
// let { configureStore, history } = require("../../app/store/configureStore");

// function setup() {
//   // const store = configureStore(initialState);
//   const app = mount(
//     <RootAny />
//   );
//   return {
//     app,
//     buttons: app.find("button")
//   };
describe("Root", () => {
  let mountedRoot: ReactWrapper<any, any> | undefined;

  const root = () => {
    if (mountedRoot === undefined) {
      mountedRoot = mount(<Root />);
    }
    return mountedRoot;
  };

  beforeEach(() => {
    mountedRoot = undefined;
  });

  it("renders without crashing", () => {
    expect(root() as ReactWrapper).toBeDefined();
  });

  // it("should display updated count after increment button click", () => {
  //   const { buttons, p } = setup();
  //   buttons.at(0).simulate("click");
  //   expect(p.text()).toMatch(/^1$/);
  // });

  // it("should display updated count after descrement button click", () => {
  //   const { buttons, p } = setup();
  //   buttons.at(1).simulate("click");
  //   expect(p.text()).toMatch(/^-1$/);
  // });

  // it("shouldnt change if even and if odd button clicked", () => {
  //   const { buttons, p } = setup();
  //   buttons.at(2).simulate("click");
  //   expect(p.text()).toMatch(/^0$/);
  // });

  // it("should change if odd and if odd button clicked", () => {
  //   const { buttons, p } = setup({ counter: 1 });
  //   buttons.at(2).simulate("click");
  //   expect(p.text()).toMatch(/^2$/);
  // });
});
