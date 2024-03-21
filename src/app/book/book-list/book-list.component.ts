import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books: Book[] = [];
  newBook: Book = { id: 1, title: '', author: '' };

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.newBook.id = this.getMaxId() + 1;
    });
  }
  
  getMaxId(): number {
    let maxId = 0;
    this.books.forEach(books => {
      if (books.id && books.id > maxId) {
        maxId = books.id;
      }
    });
    return maxId;
  }

  addBook(): void {
    if (this.newBook.title.trim() && this.newBook.author.trim()) {
      this.bookService.addBook(this.newBook).subscribe(() => {
        this.newBook.title = '';
        this.newBook.author = '';
        this.fetchBlogs(); 
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.fetchBlogs();
    });
  }
}

