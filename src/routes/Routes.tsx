import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import Form from "@/pages/Form";

import { adminRoutes } from "./AdminRoutes";
import { publicRoutes } from "./PublicRoutes";
import NotFound from "@/pages/NotFound";
import { routesGenerator } from "@/utils/Generator/RoutesGenerator";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     ...routesGenerator(publicRoutes),
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
    ],
  },
  {
    path:"/admin",
    element:<DashboardLayout/>,
    children: [
      {
        index:true,
        element:<AdminDashboard/>
      },
      ...routesGenerator(adminRoutes)
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
