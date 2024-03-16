import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import RegisterForm from "./container/pages/RegisterForm";
import MainForm from "./container/pages/MainForm";
import LoginForm from "./container/pages/LoginForm";
import FindID from "./container/pages/FindID";
import FindPassword from "./container/pages/FindPassword";
import Station from "./container/pages/Station";
import CommunityNanumList from "./container/pages/Community/CommunityNanumList";
import CommunityBunriList from "./container/pages/Community/CommunityBunriList";
import CommunityNanumWrite from "./container/pages/Community/CommunityNanumWrite";
import CommunityBunriWrite from "./container/pages/Community/CommunityBunriWrite";
import CommunityNanumDetail from "./container/pages/Community/CommunityNanumDetail";
import CommunityBunriDetail from "./container/pages/Community/CommunityBunriDetail";
import MedicineForm from "./container/pages/MedicineForm";
import SearchDetailForm from "./container/pages/SearchDetailForm";

function App() {
  return (
    <div className="container_body">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/find-id" element={<FindID />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/station" element={<Station />} />
          <Route path="/search" element={<SearchDetailForm />} />
          <Route path="/community-nanum" element={<CommunityNanumList />} />
          <Route path="/community-bunri" element={<CommunityBunriList />} />
          <Route
            path="/community-nanum/:id"
            element={<CommunityNanumDetail />}
          />
          <Route
            path="/community-bunri/:id"
            element={<CommunityBunriDetail />}
          />
          <Route
            path="/community-nanum/write"
            element={<CommunityNanumWrite />}
          />
          <Route
            path="/community-bunri/write"
            element={<CommunityBunriWrite />}
          />
          <Route path="/medicine-location" element={<MedicineForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
