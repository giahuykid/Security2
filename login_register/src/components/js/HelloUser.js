import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HelloUser = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("role");

        if (!token || userRole !== "ROLE_USER") {
            navigate("/login"); // Nếu không có quyền, quay lại login
            return;
        }

        setRole(userRole);
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🎉 Chào mừng, User!</h1>
        </div>
    );
};

export default HelloUser;