// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./state/store";

import AppContainer from "./components/AppContainer";

export default function App() {
	return(
    <Provider store={store}> 
      <AppContainer /> 
    </Provider>
  );
}
