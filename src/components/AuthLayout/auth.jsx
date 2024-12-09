// AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
    return (
        <>
            <div>
                <main>{children}</main>
            </div>
        </>
    );
};

export default AuthLayout;
