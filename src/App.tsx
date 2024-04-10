import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch } from "./store/hooks/typed-dispatch-selector/hooks";
import { Home } from "./screens/Home";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
