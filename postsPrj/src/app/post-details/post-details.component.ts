import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  id !: number;
  post !: Post; 
  comments !: Comment[];
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam)
      this.id = parseInt(idParam, 10);
    if(this.id)
      {this.httpService.findById(this.id).subscribe(post => {
        this.post = post;
      });
      this.httpService.getComments(this.id).subscribe(comment => {
        this.comments = comment;
      });
    }
  }




}
