import React from "react";
import { createRoot } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/auth-provider";
import { MyContextProvider } from "./contexts/profile-provider";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MyContextProvider>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
                </MyContextProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();