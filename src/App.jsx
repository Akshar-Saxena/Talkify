import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import VerifyPage from "./pages/VerifyPage";
import WelcomePage from "./pages/WelcomePage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/signup" element={<SignUpPage />} />
                <Route exact path="/verify" element={<VerifyPage />} />
                <Route exact path="/welcome" element={<WelcomePage />} />
            </Routes>
        </Router>
    );
}
