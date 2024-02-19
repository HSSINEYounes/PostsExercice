import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = "https://jsonplaceholder.typicode.com/posts"
  constructor(private http: HttpClient) {}

  public getAll(): Observable <Post[]>{
    return this.http.get<Post[]>(this.url);
  }
  public delete(id: number){
    return this.http.delete<Post>(this.url+'/'+id);
  }

}
