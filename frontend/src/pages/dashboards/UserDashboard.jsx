import React from "react";

const UserDashboard = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1>Welcome to your Dashboard!</h1>
            <p>You are successfully logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDashboard;