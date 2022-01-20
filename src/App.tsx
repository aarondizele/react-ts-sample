import * as React from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import { Company, Login, Organizations, Register, Home } from "./pages";
import { ApiClient } from "./api/ApiClient";

import { useSelector, useDispatch } from "react-redux"
import { userState } from "./store";
import { logout, setProfile, setToken } from "./store/user";
import { Navbar } from "./components";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(userState)

  React.useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token: string | null = localStorage.getItem("token");
    const username: string | null = localStorage.getItem("username");
    const email: string | null = localStorage.getItem("email");
    if (token) {

      dispatch(setToken({ token, username, email }));

      const profile = await ApiClient.getProfile();
      if (!profile) {
        dispatch(logout);
      }

      dispatch(setProfile(profile));
    }
  }

  // if (!userState.isAuthenticated) {
  //   return navigate("/");
  // }

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Not Authenticated */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Authenticated */}
          {/* {userState.isAuthenticated && */}
          {/* <React.Fragment> */}
          <Route path="company" element={<Company />} />
          {/* </React.Fragment> */}
          {/* } */}
        </Routes>
      </div>
    </div>
  )
}

export default App;