import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VacationList from './components/VacationList';
import { Login, Register } from './components/AuthForms';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VacationList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;