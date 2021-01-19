import { NavLink, useHistory } from "react-router-dom";
export default function Header({ loggedIn, admin, logout, activeUser }) {
  const history = useHistory();

  function onClick(e) {
    e.preventDefault();
    logout();
    history.push("/");
  }
  return (
    <ul className="header">
      <div>
        {!admin && !loggedIn ? (
          <li>
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {loggedIn && !admin ? (
          <li>
            <NavLink activeClassName="active" to="/contact">
              Contact
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {loggedIn && !admin ? (
          <li>
            <NavLink activeClassName="active" to="/viewcontact">
              ViewContact
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {loggedIn && !admin ? (
          <li>
            <NavLink activeClassName="active" to="/contactbyid">
              Search Contact
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!admin && !loggedIn ? (
          <li>
            <NavLink activeClassName="active" to="/contact">
              Log in
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </div>

      {admin || loggedIn ? (
        <div>
          <button className="active" onClick={onClick}>
            Log out
          </button>
            You are logged in as {activeUser}
        </div>
      ) : (
        ""
      )}
    </ul>
  );
}
