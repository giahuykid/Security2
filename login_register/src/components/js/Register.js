import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css"; // Import file CSS
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError("Tất cả các trường đều phải được điền!");
            return;
        }

        try {
            const response = await fetch("http://13.213.1.100:8080/register/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // Gửi cookie cùng với yêu cầu
            });

            if (response.ok) {
                navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu thành công
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Đăng ký thất bại! Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div className="registerContainer">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="registerForm">
                <div className="formGroup">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="registerBtn">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;