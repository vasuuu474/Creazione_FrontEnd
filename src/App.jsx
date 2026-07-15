import { useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const [page, setPage] = useState("signup");

  if (page === "login") {
    return <Login onSignUpClick={() => setPage("signup")} />;
  }
  return <SignUp onLoginClick={() => setPage("login")} />;
}

export default App;