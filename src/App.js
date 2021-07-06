import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { BreakpointProvider } from "./context/useBreakpoint";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import "./styles/main.scss";

const queries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  or: "(orientation: portrait)", // we can check orientation also
};

const App = () => {
  return (
    <BreakpointProvider queries={queries}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </BrowserRouter>
    </BreakpointProvider>
  );
};

export default App;
