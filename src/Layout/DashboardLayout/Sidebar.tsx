


import { ClientSidebarGroups } from "@/routes/AdminRoutes";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {ClientSidebarGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              {group.label}
            </h2>
            {group.items.map((item, itemIndex) => (
              <NavLink
                key={itemIndex}
                to={`/admin/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
