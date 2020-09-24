import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

//component
import HeaderContainer from "./containers/HeaderContainer";
import BoardViewContainer from "./containers/BoardViewContainer";
import BoardListContainer from "./containers/BoardListContainer";
import BoardWriteContainer from "./containers/BoardWriteContainer";

let App = () => {
  return (
    <div className="App">
      <Route path="/" component={HeaderContainer} />
      <Route exact path="/" component={BoardListContainer} />
      <Route exact path="/view/:id" component={BoardViewContainer} />
      <Route exact path="/write/:userName" component={BoardWriteContainer} />
    </div>
  );
};

export default App;
