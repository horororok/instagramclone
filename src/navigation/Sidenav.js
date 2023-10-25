import React, { useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { logoutUser } from "../features/userSlice";
import { auth } from "../firebase";

function Sidenav() {
  const user = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  return (
    <div className="sidenav">
      <img
        className="sidenav__logo"
        src="https://thumb.mt.co.kr/06/2023/07/2023072417523495654_1.jpg/dims/optimize/"
        alt="Instagram Logo"
      />

      <div className="sidenav__buttons">
        <button className="sidenav__button">
          <HomeIcon />
          <span>홈</span>
        </button>
        <button className="sidenav__button">
          <SearchIcon />
          <span>검색</span>
        </button>
        <button className="sidenav__button">
          <ChatIcon />
          <span>메시지</span>
        </button>
        <button className="sidenav__button">
          <FavoriteBorderIcon />
          <span>알림</span>
        </button>
        <button className="sidenav__button">
          <AddCircleOutlineIcon />
          <span>만들기</span>
        </button>
        <button className="sidenav__button" onClick={() => setShowDropdown(!showDropdown)}> 
        {/* 드롭다운 메뉴 말고 프로필 화면으로 넘어가야함 */}
          <Avatar>
            {user.username ? user.username.charAt(0).toUpperCase() : "A"}
          </Avatar>
          <span>프로필</span>
        </button>
        
      </div>
      <div className={`sidenav__more ${showDropdown ? "open" : ""}`}>
        <button className="sidenav__button" onClick={() => setShowDropdown(!showDropdown)}>
          <MenuIcon />
          <span className="sidenav__buttonText">More</span>
          {showDropdown && (
          <div className="sidenav__dropdown">
            <button className="sidenav__dropdown-item" onClick={handleLogout}>
              Logout
            </button>
            <button className="sidenav__dropdown-item">Settings</button>
          </div>
        )}
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
