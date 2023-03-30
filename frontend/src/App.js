import "../src/Styles/App.css";
import AuthLayout from "./Templates/Login";
import { AuthProvider } from "./Atoms/authProvider";
import {
  Login,
  SignUp,
  Confirmation,
  RequireAuth,
  Recovery,
  Unauthorized,
} from "./Pages/Auth";
import ErrorPage from "./Pages/404";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Confirmation" element={<Confirmation />} />
            <Route path="/Recovery" element={<Recovery />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/*
            <Route element={<RequireAuth requireUser={true}/>}>
              <Route path="/Main" element={<Dashboard />} />
              <Route path="/Setup" element={<ProfileSetup />} />
              <Route path="/MyProfile" element={<MyProfilePage />} />
              <Route path="/Profile/:id" element={<UserProfile />} />
            </Route> 
            <Route element={<RequireAuth />}>
              <Route path="/Settings" element={<Settings />} />
            </Route>
          */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
