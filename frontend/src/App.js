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
  ChangePass,
} from "./Pages/Auth";
import ErrorPage from "./Pages/404";
import Contact from "./Pages/Dashboard/Contact";
import Dashboard from "./Pages/Dashboard/Main";
import Profile from "./Pages/Dashboard/Profile";
import BikeRoute from "./Pages/Dashboard/Route";
import New from "./Pages/Dashboard/AddNew";
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
            <Route path="/Confirm" element={<Confirmation />} />
            <Route path="/Recovery" element={<Recovery />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/reset" element={<ChangePass />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/Setup" element={<ProfileSetup />} />
            <Route path="/Success" element={<Success />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Main" element={<Dashboard />} />
              <Route path="/Profile/:id" element={<Profile />} />
              <Route path="/Route/:id" element={<BikeRoute />} />
              <Route path="/New" element={<New variant={1} />} />
              <Route path="/Edit" element={<New variant={2} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
