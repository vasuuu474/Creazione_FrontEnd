import { useNavigate } from "react-router-dom";
import SignUpPage from "../SignUpPage.jsx";

export default function SignUp() {
  const navigate = useNavigate();
  return <SignUpPage onLoginClick={() => navigate("/")} />;
}
