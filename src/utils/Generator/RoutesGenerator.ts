import { RouteTypes } from "@/types/GeneratorTypes"

export const routesGenerator = (routes : RouteTypes[])=>{
    const router =routes.reduce((acc:RouteTypes[],item)=>{
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
       return acc
   },[])
   return router
}