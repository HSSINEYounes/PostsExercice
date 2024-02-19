import { Component, OnInit } from '@angular/core';
import { Post } from './models/Post';
import { HttpService } from './services/http.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'postsPrj';
  constructor(private httpService: HttpService) { }
  posts !: Post[];
  updateForme !: FormGroup;
  Updated!: Post;
  isFormVisible: boolean = false;

  ngOnInit(): void {
    this.httpService.getAll().subscribe(post => this.posts = post);
  }
}
