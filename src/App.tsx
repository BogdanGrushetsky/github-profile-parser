import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './app.scss';

import HomePage from './pages/HomePage';
import Resume from './pages/Resume';
import NoPage from './pages/NoPage';
export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:username" element={<Resume />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
