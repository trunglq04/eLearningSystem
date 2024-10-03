import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ConfirmEmailSuccess from "./pages/Verify/ConfirmEmailSuccess";
import ConfirmEmailFailed from "./pages/Verify/ConfirmEmailFailed";
import ProtectedRoute from "./utils/ProtectedRoute ";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import ManagerTutor from "./pages/Admin/Pages/ManagerTutor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/confirm-email",
    element: <VerifyEmail />,
  },
  {
    path: "/email/verify/success",
    element: <ConfirmEmailSuccess />,
  },
  {
    path: "/email/verify/failed",
    element: <ConfirmEmailFailed />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/my-profile",
        element: <Profile />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "manage-tutor",
            element: <ManagerTutor />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
