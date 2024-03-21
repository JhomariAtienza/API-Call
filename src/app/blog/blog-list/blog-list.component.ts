import { Component, OnInit } from '@angular/core';
import { Blog } from '../../model/blog';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  newBlog: Blog = { id: 1, title: '', content: '' };

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
      this.newBlog.id = this.getMaxId() + 1;
    });
  }
  
  getMaxId(): number {
    let maxId = 0;
    this.blogs.forEach(blog => {
      if (blog.id && blog.id > maxId) {
        maxId = blog.id;
      }
    });
    return maxId;
  }

  addBlog(): void {
    if (this.newBlog.title.trim() && this.newBlog.content.trim()) {
      this.blogService.addBlog(this.newBlog).subscribe(() => {
        this.newBlog.title = '';
        this.newBlog.content = '';
        this.fetchBlogs(); 
      });
    }
  }

  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      this.fetchBlogs();
    });
  }
}
