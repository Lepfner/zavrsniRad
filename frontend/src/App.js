import "../src/Styles/App.css";
import AuthLayout from "./Templates/Login";
import MainLayout from "./Templates/Dashboard";
import { AuthProvider } from "./Atoms/Auth/authProvider";
import {
  Login,
  SignUp,
  Confirmation,
  RequireAuth,
  Recovery,
  Unauthorized,
} from "./Pages/Auth";
import ErrorPage from "./Pages/404";
import Contact from "./Pages/Contact";
import ProfileSetup from "./Pages/ProfileSetup/profileSetup";
import Success from "./Pages/ProfileSetup/Success";
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
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/Settings" element={<Contact />} />
            {/*<Route path="/Main" element={<Dashboard />} />
              <Route path="/MyProfile" element={<MyProfilePage />} />
              <Route path="/Profile/:id" element={<UserProfile />} />*/}
          </Route>
          <Route element={<RequireAuth requireUser={true} />}></Route>
          <Route path="/Setup" element={<ProfileSetup />} />
          <Route path="/Success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
