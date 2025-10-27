import { ChartPie, Backpack, Users, Megaphone, Building2, Store, LayoutGrid, BriefcaseBusiness, FileChartColumnIncreasing, Grid2x2, Clipboard, Info } from "lucide-react";
import { IoExtensionPuzzleOutline, IoSettingsOutline } from "react-icons/io5";

import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import Settings from "@/pages/Admin/Settings/Settings";


// Import new page components (assuming these exist or will be created)
// For now, I'll use AdminDashboard as a placeholder for new elements if they don't exist.
// You would replace these with actual component imports as needed.
const Overview = AdminDashboard;
const Works = AdminDashboard;
const Employees = AdminDashboard;
const MarketingStrategy = AdminDashboard;
const AlfalaBuilders = AdminDashboard;
const TimosSuperShop = AdminDashboard;
const AllProgram = AdminDashboard;
const ProgramBuilder = AdminDashboard;
const ProgramName = AdminDashboard;
const ProjectReview = AdminDashboard;
const ProjectBuilder = AdminDashboard;
const ActivityLog = AdminDashboard;
const Help = AdminDashboard;


export const adminSidebarGroups = [
  {
    label: "Main Menu",
    items: [
      {
        icon: <ChartPie />,
        name: "Overview",
        path: "overview",
        element: <Overview />,
        children:[
          {
            name:"User Profile",
            path:"user-profile",
            element:<Overview/>
          },
          {
            name:"User Profile 2",
            path:"user-profile",
            element:<Overview/>
          },
          {
            name:"User Profile 3",
            path:"user-profile",
            element:<Overview/>
          }
        ]
      },
      {
        icon: <Backpack />,
        name: "Works",
        path: "works",
        element: <Works />,
      },
      {
        icon: <Users />,
        name: "Employees",
        path: "employees",
        element: <Employees />,
      },
    ],
  },
  {
    label: "Favorites",
    items: [
      {
        icon: <Megaphone />,
        name: "Marketing Strategy",
        path: "marketing-strategy",
        element: <MarketingStrategy />,
      },
      {
        icon: <Building2 />,
        name: "Alfala Building",
        path: "alfala-building",
        element: <AlfalaBuilders />,
      },
      {
        icon: <Store />,
        name: "Timo's Super Shop",
        path: "timos-super-shop",
        element: <TimosSuperShop />,
      },
    ],
  },
  {
    label: "Programs & Projects",
    items: [
      {
        icon: <LayoutGrid />,
        name: "All Program",
        path: "all-program",
        element: <AllProgram />,
      },
      {
        icon: <IoExtensionPuzzleOutline className="size-6" />,
        name: "Program Builder",
        path: "program-builder",
        element: <ProgramBuilder />,
      },
      {
        icon: <BriefcaseBusiness/>,
        name: "Program Name",
        path: "program-name",
        element: <ProgramName />,
      },
      {
        icon: <FileChartColumnIncreasing />,
        name: "Project Review",
        path: "project-review",
        element: <ProjectReview />,
      },
      {
        icon: <Grid2x2 />,      
        name: "Project Builder",
        path: "project-builder",
        element: <ProjectBuilder />,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        icon: <Clipboard />,
        name: "Activity Log",
        path: "activity-log",
        element: <ActivityLog />,
      },
      {
        icon: <Info />,
        name: "Help",
        path: "help",
        element: <Help />,
      },
      {
        icon: <IoSettingsOutline className="size-6"/>,
        name: "Settings",
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];

// // For compatibility with existing routesGenerator, we'll flatten the routes
 const adminRoutes = adminSidebarGroups.flatMap(group => group.items.map(item => {
    console.log(group)
  if (item.children) {
    return [
      {
        label: item.name,
        path: item.path,
        element: item.element,
        children: item.children.map(child => ({
          label: child.name,
          path: child.path,
          element: child.element,
        }))
      }
    ]
  } else {
    return {
      label: item.name,
      path: item.path,
      element: item.element,
    }
  }

}));

export default adminRoutes

