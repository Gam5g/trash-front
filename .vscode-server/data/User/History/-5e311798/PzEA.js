import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import RegisterForm from "./container/pages/RegisterForm";
import MainForm from "./container/pages/MainForm";
import LoginForm from "./container/pages/LoginForm";
import Station from "./container/pages/Station";
import CommunityList from "./container/pages/Community/CommunityList";
import CommunityWrite from "./container/pages/Community/CommunityWrite";
import CommunityDetail from "./container/pages/Community/CommunityDetail";
import MedicineMap from "./container/pages/MedicineMap";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/station" element={<Station />} />
          <Route path="/search?query=${encodeURIComponent(query)}"
          <Route path="/community" element={<CommunityList />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/medicine-location" element={<MedicineMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
