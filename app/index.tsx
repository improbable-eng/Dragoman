import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./containers/Root";
import * as WebFontLoader from "webfontloader";
import "./app.global.scss";

// Redux code
import { configureStore } from "./store/configureStore";
const store = configureStore();

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"],
  },
});

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root").default;
    render(
      <AppContainer>
        <NextRoot store={store}/>
      </AppContainer>,
      document.getElementById("root"));
  });
}
