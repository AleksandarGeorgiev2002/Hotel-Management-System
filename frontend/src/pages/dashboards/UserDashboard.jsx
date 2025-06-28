import React from "react";

const UserDashboard = () => {
    // Example logout handler
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove JWT
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome to your Dashboard!</h1>
            <p>You are successfully logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDashboard;