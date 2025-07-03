// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // './pages/Home'으로 경로 변경
import Authors from './pages/Authors'; // './pages/Authors'로 경로 변경
import MyPage from './pages/MyPage'; // './pages/MyPage'로 경로 변경
import Admin from './pages/Admin'; // './pages/Admin'로 경로 변경

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;