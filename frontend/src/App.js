import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ChoosedField from "./pages/ChoosedField";

export default function App() {
  const [partitaInCorso, setPartitaInCorso] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <HomePage
              partitaInCorso={partitaInCorso}
              setPartitaInCorso={setPartitaInCorso}
            />
          }
        />
        <Route path="/:id" element={<ChoosedField />} />
      </Routes>
    </Router>
  );
}
