import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "./components/userProfile.component";
import {CoreComponent}  from"./core.component";

export const coreRoutes: Routes = [
    {
        path: "",
        component: CoreComponent,
        children: [
            {
                path: "user",
                component: UserProfileComponent
                
            }
        ]
    }
];

export const coreRouting: any = RouterModule.forChild(coreRoutes);
