// import { RouteTypes } from "@/types/GeneratorTypes"

// export const routesGenerator = (routes : RouteTypes[])=>{
//     console.log(routes)
//     const router =routes.reduce((acc:RouteTypes[],item)=>{
//        if(item.path && item.element){
//            acc.push({
//                path: item.path,
//                element:item.element
//            })
//        }
//        if(item.children){
//            item.children.forEach(child =>{
//                acc.push({
//                    path:`${item.path}/${child.path}`,
//                    element:child.element
//                })
//            })
//        }
//        console.log(acc)
//        return acc
//    },[])
//    return router
// }

import { RouteObject } from "react-router-dom";
import { ReactNode } from "react";

export interface RouteType {
  label?: string;
  icon?: ReactNode;
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: RouteType[];
}

export const routesGenerator = (routes: RouteType[]): RouteObject[] => {
  const generate = (items: RouteType[]): RouteObject[] =>
    items.map((item) => {
      const route: RouteObject = {
        path: item.path,
        index: item.index,
        element: item.element,
      };

      if (item.children && item.children.length > 0) {
        route.children = generate(item.children);
      }

      return route;
    });

  return generate(routes);
};
