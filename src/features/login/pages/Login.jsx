import { useNavigate } from "react-router-dom";
import LoginPage from "../features/login/LoginPage.jsx";

export default function Login() {
  const navigate = useNavigate();
  return <LoginPage onSignUpClick={() => navigate("/")} />;
}
