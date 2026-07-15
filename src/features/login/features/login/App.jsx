// App component toggling between Login and SignUp pages
import { useState } from "react";
import Login from "../../pages/Login.jsx";
import SignUp from "../../pages/SignUp.jsx";

export default function App() {
  const [view, setView] = useState("signup");

  if (view === "signup") {
    return <SignUp onLoginClick={() => setView("login")} />;
  }

  return <Login onSignUpClick={() => setView("signup")} />;
}
