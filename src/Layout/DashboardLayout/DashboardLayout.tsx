
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



const DashboardLayout = () => {

  return (
    <div className="flex min-h-screen min-w-dvw">
    <Sidebar/>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;