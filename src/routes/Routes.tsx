import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/Public/About/About";
import Contact from "../pages/Public/Contact/Contact";
import NotFound from "../pages/NotFound";

import AdminRoute from "./AdminAuthRoutes";
import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import Form from "@/pages/Form";
import Services from "@/pages/Public/Services/Services";
import Home from "@/pages/Public/Home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/admin",
        element: <AdminRoute />, // This will check if the user is an admin
        children: [
          { path: "", element: <AdminDashboard /> }, // Admin Dashboard
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
