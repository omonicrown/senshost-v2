import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "@sebgroup/react-components/dist/Loader";

import { IntlProvider } from "react-intl";
import { HashRouter } from "react-router-dom";
import "url-search-params-polyfill";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import "./styles/main.scss";
import { store, persistor } from "./store/configureStore";


if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/dist/locale-data/en"); // Add locale data for de
}

if (!(Intl as any).RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/dist/polyfill");
  require("@formatjs/intl-relativetimeformat/dist/locale-data/en"); // Add locale data for de
}


ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <PersistGate loading={<Loader toggle={true} />} persistor={persistor}>
        <HashRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </HashRouter>
      </PersistGate>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
