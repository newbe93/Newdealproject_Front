import React from "react";
import { Outlet } from "react-router-dom";

const DetailLayout = () => {
    return (
        <div className="auth-container">
            <Outlet />
        </div>
    )
}

export default DetailLayout;