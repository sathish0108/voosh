import React from "react";
import instance from "../service";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await instance
        .post("/api/signout")
        .then((res) => {
          console.log(res);
          localStorage.clear();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
