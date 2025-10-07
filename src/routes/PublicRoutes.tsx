import About from "../pages/Public/About/About";
import Contact from "../pages/Public/Contact/Contact";
import Services from "@/pages/Public/Services/Services";
import Home from "@/pages/Public/Home/Home";

export const publicRoutes = [
     {
        label:"Home",
        index:true,
        path: "/",
        element: <Home />,
      },
      {
        label:"About",
        path: "/about",
        element: <About />,
        children:[
            {
              label:"About 2",  
              path:'about2'

            }
        ]
      },
      {
        label:"Contact",
        path: "/contact",
        element: <Contact />,
      },
      {
        label:"Services",
        path: "/services",
        element: <Services />,
      }
]