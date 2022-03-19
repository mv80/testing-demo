import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IPost } from '../post/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  
  constructor(private postService: PostService) {}

  posts: IPost[];

  public ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(take(1))
      .subscribe((posts) => (this.posts = posts));
  }
  public async updateLikes(postId: number): Promise<void> {
    const result = await this.postService.updatePostLikes(postId);
    this.posts = this.posts.map(post=> {
      if(post.id === postId) {
        post.isLiked = true; 
        post.likes++;
      }
      return post;
    })
  }
}
