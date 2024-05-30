import React from "react";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import RegisterForm from "./container/pages/RegisterForm";
import MainForm from "./container/pages/MainForm";
import LoginForm from "./container/pages/LoginForm";
import WithdrawalForm from "./container/pages/WithdrawalForm";
import FindID from "./container/pages/FindID";
import FindPassword from "./container/pages/FindPassword";
import Station from "./container/pages/Station";
import CommunityNanumList from "./container/pages/Community/CommunityNanumList";
import CommunityBunriList from "./container/pages/Community/CommunityBunriList";
import CommunityNanumWrite from "./container/pages/Community/CommunityNanumWrite";
import CommunityBunriWrite from "./container/pages/Community/CommunityBunriWrite";
import CommunityNanumDetail from "./container/pages/Community/CommunityNanumDetail";
import CommunityBunriDetail from "./container/pages/Community/CommunityBunriDetail";
import MyPageForm from "./container/pages/MyPageForm";
import MyPageUpdateForm from "./container/pages/MyPageUpdateForm";
import MyCommunityList from "./container/pages/MyCommunityList";
import BatteryForm from "./container/pages/BatteryForm";
import MedicineForm from "./container/pages/MedicineForm";
import SearchDetailForm from "./container/pages/SearchDetailForm";
import SearchEditForm from "./container/pages/SearchEditForm";
import SwaggerDocs from "./SwaggerDocs";
import NotFound from "./container/pages/NotFound";
import Header from "./header";
import { RecoilRoot } from "recoil";
import { isLoggedInState } from "./state/authState";
import Loading from "./container/pages/LoadingForm";

function App() {
  const initializeState = ({ set }) => {
    const accessToken = localStorage.getItem("accessToken");
    const isLoggedIn = !!accessToken;
    set(isLoggedInState, isLoggedIn);
  };
  return (
    <div className="container_body">
      <RecoilRoot initializeState={initializeState}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<MainForm />} />
            <Route path="/api/auth/sign-up" element={<RegisterForm />} />
            <Route path="/api/auth/sign-in" element={<LoginForm />} />
            <Route
              path="/api/account/withdrawal"
              element={<WithdrawalForm />}
            />
            <Route path="/find-id" element={<FindID />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="/station" element={<Station />} />
            <Route path="/search" element={<SearchDetailForm />} />
            <Route path="/search/edit" element={<SearchEditForm />} />
            <Route path="/community-nanum" element={<CommunityNanumList />} />
            <Route path="/community-bunri" element={<CommunityBunriList />} />
            <Route path="/my-page" element={<MyPageForm />} />
            <Route path="/my-page/update" element={<MyPageUpdateForm />} />
            <Route path="/my-page/list" element={<MyCommunityList />} />
            <Route path="/loading" element={<Loading />} />
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
            <Route path="/battery" element={<BatteryForm />} />
            <Route path="/medicine" element={<MedicineForm />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
        <SwaggerDocs />
      </RecoilRoot>
    </div>
  );
}

export default App;
