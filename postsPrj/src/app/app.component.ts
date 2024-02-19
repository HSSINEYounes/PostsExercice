import { Component, OnInit } from '@angular/core';
import { Post } from './models/Post';
import { HttpService } from './services/http.service';
import { FormGroup } from '@angular/forms';
import { faMagnifyingGlass, faTrash  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
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

  ngOnInit(): void {
    this.httpService.getAll().subscribe(post => {
      this.posts = post;
      this.filteredPosts = [...this.posts];
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
}
