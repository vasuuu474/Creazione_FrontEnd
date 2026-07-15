import { useNavigate } from "react-router-dom";
import SignUpPage from "../features/login/SignUpPage.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  return <SignUpPage onLoginClick={() => navigate("/login")} />;
}
