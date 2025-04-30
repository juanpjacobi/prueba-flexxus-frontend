import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OOPSection from '../pages/OOPSection';
import SQLSection from '../pages/SQLSection';
import CRUDSection from '../pages/CRUDSection';
import Login from '../pages/Login';
import Layout from '../components/shared/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>  
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="oop" element={<OOPSection />} />
        <Route path="sql" element={<SQLSection />} />
        <Route path="crud" element={<CRUDSection />} />
      </Route>
    </Routes>
  );
}