import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PostService } from '../services/post.service';

import { PostListComponent } from './post-list.component';
import { postsMock } from '../services/posts.mock';
import { of } from 'rxjs';
import { IPost } from '../post/post.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const postServiceMock = jasmine.createSpyObj(PostService, [
    'getPosts',
    'updatePostLikes'
  ]);

  const mockPosts: IPost[] = [
    {
      userId: 1,
      id: 1,
      title: 'post 1 title',
      body: 'post 1 body',
      likes: 100,
      isLiked: false
    },
    {
      userId: 2,
      id: 2,
      title: 'post 2 title',
      body: 'post 2 body',
      likes: 50,
      isLiked: false
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      providers: [{ provide: PostService, useFactory: () =>  postServiceMock }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    postServiceMock.getPosts.and.returnValue(of(mockPosts));
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a list of posts when loads', () => {
    expect(component.posts.length).toBeGreaterThan(0);
  });
  describe('update likes', () => {

    it('should increase number of likes by one once updateLikes is called', async() => {

      const mockPostId = component.posts[0].id;
      const postLikesBeforeUpdate = component.posts[0].likes;
      postServiceMock.updatePostLikes.withArgs(mockPostId).and.returnValue(of(mockPostId));
  
      await component.updateLikes(1);
      
      const postLikesAfterUpdate = component.posts[0].likes;
      expect(postLikesAfterUpdate).toBeGreaterThan(postLikesBeforeUpdate);
      expect(postLikesAfterUpdate).toEqual(postLikesBeforeUpdate + 1);
    });
    it('should call postService with expected args once updates like is called', async() => {
      const mockPostId = component.posts[0].id;
      postServiceMock.updatePostLikes.withArgs(mockPostId).and.returnValue(of(mockPostId));
  
      await component.updateLikes(1);
  
      expect(postServiceMock.updatePostLikes).toHaveBeenCalledWith(mockPostId);
    });
  });
 
});
