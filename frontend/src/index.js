import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { itIT } from "@clerk/localizations";

const clerkFrontendAPI = process.env.REACT_APP_CLERK_KEY;

if (!clerkFrontendAPI) {
  throw new Error("Clerk publishable key is missing!");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendAPI} localization={itIT}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
