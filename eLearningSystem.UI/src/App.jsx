import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ConfirmEmailSuccess from "./pages/Verify/ConfirmEmailSuccess";
import ConfirmEmailFailed from "./pages/Verify/ConfirmEmailFailed";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
