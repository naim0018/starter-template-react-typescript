import { ReactNode } from "react";

export interface RouteTypes {
    icon?:ReactNode,
    label?:string,
    path?:string,
    element?:ReactNode,
    children?: RouteTypes[]
}
