import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IPost } from '../post/post.model';
import { map } from 'rxjs/operators';
import { BASE_URL, NUMBER_OF_POSTS } from './posts.consts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(BASE_URL).pipe(
      map((posts) => posts.splice(0, NUMBER_OF_POSTS)),
      map((posts: IPost[]) => {
        return posts.map((post) => {
          post.likes = this.getRandomNumber();
          post.isLiked = false;
          return post;
        });
      }),
    ) as Observable<IPost[]>;
  }

  public updatePostLikes(post: IPost): Promise<IPost> {
    return this.http.put<IPost>(`${BASE_URL}/${post.id}`,post)
    .toPromise<IPost>();
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}
