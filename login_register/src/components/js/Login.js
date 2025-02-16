import React, { useState } from "react";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // Thêm state cho thông báo thành công

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
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: "include", // Gửi cookie cùng với yêu cầu
            });

            if (response.ok) {
                setSuccessMessage("Đăng nhập thành công!"); // Hiển thị thông báo thành công
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Đăng nhập thất bại! Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            {successMessage && <p>{successMessage}</p>} {/* Hiển thị thông báo thành công */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
