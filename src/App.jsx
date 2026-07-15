import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page-level components — each team member's PR should export
// a single page component like this (see notes below per-page).
import Login from "./features/login/pages/Login";
import SignUp from "./features/login/pages/SignUp";
import EnterDetails from "./features/personal-details-page/pages/EnterDetails";
import HomePage from "./features/home-page/HomePage";
import WorkspacePage from "./pages/WorkspacePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Login / SignUp */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 2. Personal Details */}
        <Route path="/details" element={<EnterDetails />} />

        {/* 3. Home */}
        <Route path="/home" element={<HomePage />} />

        {/* 3b. Workspace — role ("member" | "founder") comes from
            navigate("/workspace", { state: { role: "member" } }) */}
        <Route path="/workspace" element={<WorkspacePage />} />

        {/* 4. Profile — reachable from any page via the profile icon */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* fallback: unknown routes go back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
