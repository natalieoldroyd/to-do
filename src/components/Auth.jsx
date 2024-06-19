import * as React from "react";
import Dashboard from "./Dashboard";
import {useState, useContext} from "react";

const authContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }) => {
  // const isAuthenticated = false;

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  };

  const logout = () => {
    setIsAuthenticated(false)
  };

  return <authContext.Provider value={{isAuthenticated, login, logout}}>{children}</authContext.Provider>;
};

function NavBar() {
  // const logout = () => {};
  // const isAuthenticated = false;

  const {logout, isAuthenticated} = useContext(authContext)

  return (
    <nav>
      <span role="img" aria-label="Money bags emoji">
        💰
      </span>
      {isAuthenticated && (
        <button className="link" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

function LoginForm() {
  // const login = () => {};

  const {login} = useContext(authContext)
  //since LoginForm is conditionally rendred from Main and Main is direct child of AuthProvider I am able to get access to the passed value. 

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    login(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      </div>
      <button className="primary" type="submit">
        Login
      </button>
    </form>
  );
}

function Main() {
  // const isAuthenticated = false;

   const {isAuthenticated} = useContext(authContext)

  return <main>{isAuthenticated ? <Dashboard /> : <LoginForm />}</main>;
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Main />

    </AuthProvider>
  );
}
