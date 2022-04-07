import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from '../post/post.model';
import { BASE_URL, NUMBER_OF_POSTS } from './posts.consts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(BASE_URL)
    .pipe(
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
    post.likes++;
    post.isLiked = true;
    return this.http.put<IPost>(`${BASE_URL}/${post.id}`,post)
    .toPromise<IPost>();
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}
