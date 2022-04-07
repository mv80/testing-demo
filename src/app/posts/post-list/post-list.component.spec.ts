import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';
import { of } from 'rxjs';
import { IPost } from '../post/post.model';
import { PostService } from '../services/post.service';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const postServiceMock = jasmine.createSpyObj(PostService, [
    'getPosts',
    'updatePostLikes',
  ]);

  const mockPosts: IPost[] = [
    {
      userId: 1,
      id: 1,
      title: 'post 1 title',
      body: 'post 1 body',
      likes: 100,
      isLiked: false,
    },
    {
      userId: 2,
      id: 2,
      title: 'post 2 title',
      body: 'post 2 body',
      likes: 50,
      isLiked: false,
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [{ provide: PostService, useFactory: () => postServiceMock }],
    }).compileComponents();
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

  it('should set posts to an array of posts', () => {
    expect(component.posts.length).toBeGreaterThan(0);
  });
  describe('update likes', () => {
    const mockPostId = 1;
    beforeEach(() => {
      const updatedPost = {...mockPosts[0]};
      updatedPost.isLiked = true;
      updatedPost.likes++;
      postServiceMock.updatePostLikes.and.returnValue(
        Promise.resolve(updatedPost)
      );
    });

    it('should increase number of likes by one once updateLikes is called', fakeAsync(() => {
      const numOfPostLikesBeforeUpdate = component.posts[0].likes;
      component.updateLikes(1).then(() => {

        const numOfPostLikeAfterUpdate = component.posts[0].likes;
        expect(numOfPostLikeAfterUpdate).toBeGreaterThan(
          numOfPostLikesBeforeUpdate
        );

        expect(numOfPostLikeAfterUpdate).toEqual(
          numOfPostLikesBeforeUpdate + 1
        );
      });
    }));
    it('should call postService with expected post', async () => {
      await component.updateLikes(1);
      const expectedPost = {...mockPosts[0]};
      expect(postServiceMock.updatePostLikes).toHaveBeenCalledWith(
        expectedPost
      );
    });

    it('should set post is liked to true after call for updatePostLikes', async () => {
      await component.updateLikes(mockPostId);
      const post = component.posts.find((post) => post.id === mockPostId);
      expect(post.isLiked).toBeTrue();
    });

    // same test  - using done callback
    it('should set post is liked to true after call for updatePostLikes', (done) => {
      component.updateLikes(1).then(() => {
        const post = component.posts.find((post) => post.id === 1);
        expect(post.isLiked).toBeTrue();
        done();
      });
    });
  });
});
