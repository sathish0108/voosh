import React from "react";
import instance from "../service";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    instance
      .post("/api/signout")
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="head">
      <button className="header" onClick={() => handleLogout()}>
        logout
      </button>
    </div>
  );
};
