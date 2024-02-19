import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Post } from '../models/Post';
import { FormGroup } from '@angular/forms';
import { faMagnifyingGlass, faTrash  } from '@fortawesome/free-solid-svg-icons';
import { settings } from '../settings';
import { User } from '../models/User';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'postsPrj';
  constructor(private httpService: HttpService) { }
  posts !: Post[];
  filteredPosts !: Post[];
  updateForme !: FormGroup;
  Updated!: Post;
  isFormVisible: boolean = false;
  searchKeyword: string = '';
  faMagnifyingGlass = faMagnifyingGlass;
  faTrash = faTrash;
  currentPage = 1;
  itemsPerPage = settings.itemsPerPage;
  totalPages = 1;
  paginatedPosts: any[] = [];
  pages: number[] = [];
  user !: User;

  ngOnInit(): void {
    this.httpService.getAll().subscribe((data: any) => {
    this.posts = data;
    this.totalPages = Math.ceil(this.posts.length / this.itemsPerPage);
    this.updatePaginatedPosts();
    this.updatePagesArray();
    
  });
  }
  
  delete(id: number) {
    this.httpService.delete(id).subscribe({
      next: () => {
        console.log('Post deleted:', id);
      },
      error: (error) => {
        console.error('Error updating post:', error);
      }
    });
  }

  wordCount(body: string | null | undefined): number {
    if (!body) {
      return 0;
    }
    return body.trim().split(/\s+/).length;
  }

  filterPosts(): void {
    if (this.searchKeyword.trim()) {
      this.filteredPosts = this.posts.filter(post =>
        post.body.includes(this.searchKeyword.trim())
      );
    } else {
      this.filteredPosts = [...this.posts];
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  updatePaginatedPosts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }
  updatePagesArray(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getUserByPost(id: number){
    this.httpService.getPostOwner(id).subscribe(user => {
      this.user = user;
    });
    return this.user.name
  }

}
