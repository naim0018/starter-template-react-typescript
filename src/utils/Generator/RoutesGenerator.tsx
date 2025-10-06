import { adminRoutes } from "@/routes/AdminRoutes";
import { ReactNode } from "react";

interface AdminRouteTypes {
    path:string,
    element:ReactNode
}

export const RoutesGenerator : AdminRouteTypes[] = adminRoutes.reduce((acc:AdminRouteTypes[],item)=>{
    if(item.path && item.element){
        acc.push({
            path: item.path,
            element:item.element
        })
    }

    if(item.children){
        item.children.forEach(child =>{
            acc.push({
                path:child.path,
                element:child.element
            })
        })
    }
    console.log(acc)

    return acc
},[])