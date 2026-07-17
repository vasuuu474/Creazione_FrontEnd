import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage.jsx";

export default function Login() {
  const navigate = useNavigate();
  return <LoginPage onSignUpClick={() => navigate("/signup")} />;
}
