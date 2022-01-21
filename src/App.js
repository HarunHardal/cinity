import { Route, Router, Switch, withRouter } from "react-router";
import React, { useEffect, useState } from "react";
import Footer from "./components/footerComponent/Footer";
import Nav from "./components/navComponents/Nav";
import Root from "./components/rootComponent/Root";
import Detail from "./components/detailComponenet/Detail";
import Loader from "./components/loaderComponent/Loader";
import WatchList from "./components/watchListComponent/WatchList";
import AllMovies from "./components/allMoviesComponent/AllMovies";
import "./index.css";
import Person from "./components/personComponent/Person";

function App() {

  const loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;

  return (
        <div className="page-container">
          {/* <Loader loadTime={loadTime}/>  */}
          <div className="page-wrapper">
            <Nav />
            <Switch>
              <Route path="/" exact component={Root} />
              <Route path={"/watchlist"} component={WatchList} />
              <Route path={"/load"} component={Loader} />
              <Route
                path={"/detail/:type/:id/:name"}
                component={(props) => <Detail {...props} />}
              />
              <Route
                path="/all/:type"
                component={(props) => <AllMovies {...props} />}
              />
              <Route
                path="/person/:id/:name"
                component={(props) => <Person {...props} />}
              />
            </Switch>
          </div>
          <Footer />
        </div>

  );
}
export default withRouter(App);
