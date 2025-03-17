import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/js/Login";
import Register from "./components/js/Register";
import HelloUser from "./components/js/HelloUser";

function App() {
    return (
        <Router>
            <div className="App">
                <h1 style={{ textAlign: "center", margin: "20px 0" }}>React Auth System</h1>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} /> {/* Chuyển hướng mặc định */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/hello-user" element={<HelloUser />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

