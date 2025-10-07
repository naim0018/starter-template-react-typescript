import { adminRoutes } from "@/routes/AdminRoutes";
import { RouteTypes } from "@/types/GeneratorTypes";


export const SidebarGenerator = adminRoutes.reduce<RouteTypes[]>(
  (acc, item) => {
    if (item.path && item.label) {
      acc.push({
        label: item.label,
        path: item.path,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          label: child.label,
          path: child.path,
        });
      });
    }
    console.log("Sidebar Generator",acc)
    return acc;
  },
  []
);
