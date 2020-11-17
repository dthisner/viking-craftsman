import React from "react";
import "./App.css";

import TopNav from "./component/navBar/topNav";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <TopNav />
      <Routes />
    </div>
  );
}
export default App;
