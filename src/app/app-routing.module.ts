import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BookListComponent } from './book/book-list/book-list.component';

const routes: Routes = [
  { path: 'blogs', component: BlogListComponent },
  { path: 'books', component: BookListComponent },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: '**', redirectTo: '/blogs' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
