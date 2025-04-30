import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import OOPSection from "../pages/OOPSection";
import SQLSection from "../pages/SQLSection";
import CRUDSection from "../pages/CRUDSection";
import RequireNoAuth from "../components/auth/RequireNoAuth";
import RequireAuth from "../components/auth/RequireAuth";
import Layout from "../components/shared/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          <RequireNoAuth>
            <Login />
          </RequireNoAuth>
        }
      />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/oop" replace />} />
        <Route path="oop" element={<OOPSection />} />
        <Route path="sql" element={<SQLSection />} />
        <Route path="crud" element={<CRUDSection />} />
      </Route>
    </Routes>
  );
}
