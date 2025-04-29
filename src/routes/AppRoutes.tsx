import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import OOPSection from '../pages/OOPSection';
import SQLSection from '../pages/SQLSection';
import CRUDSection from '../pages/CRUDSection';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>   
        <Route index element={<Navigate to="/oop" replace />} />
        <Route path="oop" element={<OOPSection />} />
        <Route path="sql" element={<SQLSection />} />
        <Route path="crud" element={<CRUDSection />} />
      </Route>
    </Routes>
  );
}
