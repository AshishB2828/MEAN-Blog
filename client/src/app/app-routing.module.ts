import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { DeleteBlogComponent } from './components/delete-blog/delete-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent, canActivate:[NoAuthGuard]},
  {path:'login', component: LoginComponent, canActivate:[NoAuthGuard]},
  {path:'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'profile/:id', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'edit-blog/:id', component: EditBlogComponent,canActivate:[AuthGuard]},
  {path:'delete-blog/:id', component: DeleteBlogComponent,canActivate:[AuthGuard]},
  {path:'blog', component: BlogComponent, canActivate:[]},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
