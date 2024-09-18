import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { authRoutes } from './route/auth.routes';

export const routes: Routes = [
    { path:'', component:PostListComponent },
    { path:'create', component: PostCreateComponent, canActivate: [AuthGuard]},
    { path:'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
    { path: 'auth', loadChildren: () => import('./route/auth.routes').then(m => authRoutes)}
    
];
