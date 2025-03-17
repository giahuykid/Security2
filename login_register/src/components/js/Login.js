import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; // Import file CSS

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
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
        setError(""); // Xóa lỗi cũ

        console.log("⏳ Đang gửi yêu cầu đăng nhập...");

        try {
            const response = await fetch("http://18.142.237.185:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: "include",
            });

            console.log("📩 Phản hồi từ server:", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Đăng nhập thất bại!");
            }

            const data = await response.json();
            console.log("✅ Dữ liệu nhận được:", data);

            if (!data.token || !data.role) {
                throw new Error("Dữ liệu không hợp lệ từ server!");
            }

            // Lưu token & role vào localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            console.log("🔑 Token:", localStorage.getItem("token"));
            console.log("👤 Role:", localStorage.getItem("role"));

            // Chuyển hướng theo role
            if (data.role === "ROLE_USER") {
                console.log("🔄 Chuyển hướng đến /hello-user...");
                navigate("/hello-user");
            } else {
                throw new Error("Bạn không có quyền truy cập.");
            }
        } catch (err) {
            console.error("❌ Lỗi:", err.message);
            setError(err.message);
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
            {error && <p className="errorMessage">{error}</p>}
        </div>
    );
};

export default Login;
