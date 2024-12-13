import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./posts/posts-routing.module').then(m => m.PostsRoutingModule),
    }
];
