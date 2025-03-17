import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setError("");

        // Kiểm tra dữ liệu nhập vào
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError("Tất cả các trường đều phải được điền!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://18.142.237.185:8080/register/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Đăng ký thất bại! Email có thể đã tồn tại.");
            }

            setSuccessMessage("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                        required
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
                        required
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
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="registerBtn" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Register"}
                </button>
            </form>
            {successMessage && <p className="successMessage">{successMessage}</p>}
            {error && <p className="errorMessage">{error}</p>}
        </div>
    );
};

export default Register;
