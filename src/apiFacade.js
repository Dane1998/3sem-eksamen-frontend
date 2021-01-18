import links from "./settings";

const URL = links.server;

function apiFacade() {

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };
  const setActiveUser = (user) => {
    localStorage.setItem("user", user);
  };
  const getActiveUser = () => {
    return localStorage.getItem("user");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setActiveUser(user);
      });
  };


  const registerUser = (user) => {
    const options = makeOptions("POST", false, {
      ...user,
    });
    return fetch(URL + "/api/info", options).then(handleHttpErrors);
  };
 
 const fetchContacts = (e) => {
   const options = makeOptions("GET")
   return fetch (URL + links.allContacts, options)
   .then(handleHttpErrors)
   .then((data) => {
      e(data)
   })
 }

  const addContact = (contact) => {
    const options = makeOptions("POST", true, contact);
    return fetch(URL + links.newContact, options).then(handleHttpErrors);
  }

  const searchContact = (id) => {
    const options = makeOptions("GET", true);
    return fetch(URL + links.searchContact + id, options).then(handleHttpErrors);
  }

  const deleteContact = (id) => {
    const options = makeOptions("DELETE", true);
    return fetch(URL + links.deleteContact + id, options).then(handleHttpErrors);
  }

  const updateContact = (id) => {
    const options = makeOptions("PUT", true);
    return fetch(URL + links.updateContact + id, options).then(handleHttpErrors);
  }
  

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    registerUser,
    getActiveUser,
    addContact,
    fetchContacts,
    searchContact,
    deleteContact,
    updateContact,


  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}
export default facade;
