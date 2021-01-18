import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";


import facade from "./apiFacade";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import Contact from "./components/Contact"
import ViewContact from "./components/ViewContact"
import ContactSearch from "./components/ContactById"



function App() {
  const init = { username: "", password: "" };
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn);
  const [errorMsg, setErrMsg] = useState("");
  const [activeUser, setActiveUser] = useState(facade.getActivUser);
  const [admin, setAdmin] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setAdmin(false);
    setActiveUser(false);
  };


  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then(() => {
        user !== "admin" ? setLoggedIn(true) : setAdmin(true);
        setActiveUser(user);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrMsg(e.message));
        } else {
          setErrMsg("Network error has occurred: could not log in");
          console.log("Network error! Could not log in");
        }
      });
    setErrMsg("");
  };
  return (
    <Router>
      <div className="App">
        <Header
          loggedIn={loggedIn}
          admin={admin}
          logout={logout}
          activeUser={activeUser}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          {!loggedIn ? (
            <Route exact path="/register">
              <Register facade={facade} init={init} />
            </Route>
          ) : (
            ""
          )}
          {!loggedIn ? (
            <Route exact path="/login">
              <LogIn login={login} init={init} errorMsg={errorMsg} />
            </Route>
          ) : (
            ""
          )}
           {loggedIn ? (
            <Route exact path="/contact">
              <Contact />
            </Route>
          ) : (
            ""
          )}
          {loggedIn ? (
            <Route exact path="/viewcontact">
              <ViewContact />
            </Route>
          ) : (
            ""
          )}
          {loggedIn ? (
            <Route exact path="/contactbyid">
              <ContactSearch />
            </Route>
          ) : (
            ""
          )}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
