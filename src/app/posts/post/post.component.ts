import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() post: IPost;

  @Output() onPostLike = new EventEmitter<number>();
 
  public like(): void {
    this.onPostLike.emit(this.post.id);
  }

}
