import { Component, OnInit } from '@angular/core';
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
   const post = this.posts.find(post => post.id === postId);
   const updatedPost = await this.postService.updatePostLikes(post);
    this.posts = this.posts.map(post=> {
      if(post.id === updatedPost.id) {
       post = updatedPost;
      }
      return post;
    })
  }
}
