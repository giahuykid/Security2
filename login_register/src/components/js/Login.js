import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css"; // Import file CSS

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://18.142.237.185:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Lưu token vào localStorage
                setSuccessMessage("Đăng nhập thành công!");

                setTimeout(() => {
                    navigate("/"); // Chuyển hướng sau khi đăng nhập
                }, 1000);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Đăng nhập thất bại! Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="formGroup">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="loginBtn">Login</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
            {successMessage && <p className="successMessage">{successMessage}</p>}
            {error && <p className="errorMessage">{error}</p>}
        </div>
    );
};

export default Login;
