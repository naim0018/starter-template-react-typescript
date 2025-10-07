import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { publicRoutes } from "@/routes/PublicRoutes";
import NavbarGenerator from "@/utils/Generator/NavbarGenerator";
import { NavLink } from "react-router-dom";

const NavItems = () => {
  const navbarItems = NavbarGenerator(publicRoutes);

  return (
    <NavigationMenu >
      <NavigationMenuList className="">
        {navbarItems.map((item) => (
          <NavigationMenuItem key={item.path} className=""> 
            {item.children && item.children.length > 0 ? (
              <>
                {/* Parent trigger */}
                <NavigationMenuTrigger className="text-white">
                  {item.label}
                </NavigationMenuTrigger>

                {/* Dropdown for children */}
                <NavigationMenuContent className="grid gap-2 p-4  shadow-lg rounded-lg min-w-[200px] bg-website-color-green border border-website-color-lightGreen">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path || "#"}
                      className={({isActive})=>`${isActive ? "border-b-2 " : ""} text-center p1 px-5 py-2 no-underline text-white`}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </NavigationMenuContent>
              </>
            ) : (
              // Simple link (no children)
              <NavLink
                to={item.path || "#"}
                className={({isActive})=>`${isActive ? "border-b-2 " : ""} text-center p1 px-5 py-2 no-underline text-white`}
              >
                {item.label}
              </NavLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavItems;
