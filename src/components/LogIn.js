import React, { useState } from "react";


export default function LogIn({ login, init }) {
  const [loginCredentials, setLoginCredentials] = useState(init);


  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password, () => {
    });
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div> 
    <h1> Log in </h1>
          <form onChange={onChange}>
            
                Username:
                <input type="text" id="username" onChange={onChange} />
          
           
                Password:
                <input type="password" id="password" onChange={onChange} />
            
              <button onClick={performLogin}>Login</button>
         
          </form>
          </div>
  );
}
