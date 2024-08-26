import React, { useState } from "react";
import instance from "../service";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleSuccess = (response) => {
    const idToken = response.credential;

    console.log(idToken);

    const userInfo = jwtDecode(idToken);

    console.log("User Info:", userInfo);

    localStorage.setItem(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiU3VuIEF1ZyAyNSAyMDI0IDA5OjE4OjQ3IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJ1c2VyIjoidGVyIiwiaWF0IjoxNzI0NTc3NTI3fQ.kmkiidvSqcw1uoAm-qVDXZTyPlJ_WLVlfLR81s-Se54",
      idToken
    );

    // navigate("/home");
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance
        .post("/api/signin", credentials)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.TOKEN);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="loginui">
        <form onSubmit={handleSubmit} class="container1">
          <div class="form-wrapper">
            <h2>Login</h2>
            <div class="input-group">
              <input
                type="text"
                name="username"
                placeholder="Email"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div class="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" class="login-button">
              Login
            </button>
            <button onClick={() => navigate("/signup")} class="signup-button">
              Sign Up
            </button>
            <br />
            {/* <div class="google-signup">
              <button type="button" onClick={googleAuth} class="google-button">
                <img src="ch.png" alt="Google icon" class="google-icon" />
                Sign Up with Google
              </button>
            </div> */}
            <div class="google-signup">
              <GoogleLogin
                onSuccess={(handleSuccess) => {
                  console.log(handleSuccess);

                  const handleSuccessDecoded = jwtDecode(handleSuccess.credential);
                  console.log(handleSuccessDecoded, "hanndle");
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
