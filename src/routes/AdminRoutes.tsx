import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import Settings from "@/pages/Admin/Settings/Settings";
import Support from "@/pages/Admin/Support/Support";
import { RiDashboardFill, RiSettings3Fill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

export const adminRoutes = [
    {
      icon: <RiDashboardFill />,
      label: "Dashboard",
      index:true,
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      icon: <BiSupport />,
      label: "Support",
      path: "support",
      element: <Support />,
    },
    {
      icon: <RiSettings3Fill />,
      label: "Settings",
      path: "settings",
      element: <Settings />,
    },
  
];
