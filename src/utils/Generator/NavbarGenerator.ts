import { RouteTypes } from "@/types/GeneratorTypes";

export default function NavbarGenerator(items: RouteTypes[]) {
  const navbar = items.reduce<RouteTypes[]>((acc, item) => {
   if (item.children) {
      acc.push({
        label: item.label,
        path: item.path,
        children: item.children.map((child) => ({
          label: child.label,
          path: child.path,
        })),
      });
    }else if (item.path && item.label) {
      acc.push({
        label: item.label,
        path: item.path,
      });
    }
    return acc;
  }, []);
  return navbar;
}
