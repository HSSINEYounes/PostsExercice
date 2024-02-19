import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "details/:id", component: PostDetailsComponent},
  {path: "", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
