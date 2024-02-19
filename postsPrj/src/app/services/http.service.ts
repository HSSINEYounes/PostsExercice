import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = "https://jsonplaceholder.typicode.com/posts"
  usersUrl: string = "https://jsonplaceholder.typicode.com/users"
  constructor(private http: HttpClient) {}

  public getAll(): Observable <Post[]>{
    return this.http.get<Post[]>(this.url);
  }
  public delete(id: number){
    return this.http.delete<Post>(this.url+'/'+id);
  }

  public findById(id: number){
    return this.http.get<Post>(this.url+'/'+id);
  }

  public getComments(id: number){
    return this.http.get<Comment[]>(this.url+'/'+id+'/comments');
  }

  public getPostOwner(id: number){
    return this.http.get<User>("https://jsonplaceholder.typicode.com/users/"+2);
  }

}
