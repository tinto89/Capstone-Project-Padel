import React from "react";
import { SignInButton } from "@clerk/clerk-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <img
            src="/icon_logo.ico"
            alt="Padel Manager Logo"
            style={{ width: "100px", marginBottom: "15px" }}
          />
          <h3>Accedi a Padel Manager</h3>
        </div>
        <SignInButton />
      </div>
    </div>
  );
}
