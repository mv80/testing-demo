import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IPost } from '../post/post.model';
import { PostService } from './post.service';
import { postsMock } from './posts.mock';
import { NUMBER_OF_POSTS } from './posts.consts';

describe('PostService', () => {
  let service: PostService;
  const httpClientServiceMock = jasmine.createSpyObj('HttpClient', [
    'post',
    'get',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientServiceMock }],
    });
    service = TestBed.inject(PostService);
    httpClientServiceMock.get.and.returnValue(of(postsMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should return number of posts as expected', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          expect(postsData.length).toEqual(NUMBER_OF_POSTS);
          done();
        });
    });
    it('should return post with is liked equal false and number of likes', (done) => {
      const arrayWithOnePostItem = [{ ...postsMock[0] }];
      httpClientServiceMock.get.and.returnValue(of(arrayWithOnePostItem));

      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          const postItem = postsData[0];
          expect(postItem.isLiked).toBeFalse();
          expect(postItem.likes).toEqual(jasmine.any(Number));
          done();
        });
    });
  });
  describe('updatePostLikes', () => {
    it('should return the post id once called', async() => {
      const mockPostId = 1;
      const result = await service.updatePostLikes(mockPostId);
      expect(result).toEqual(mockPostId);
    });
    it('should return the post id once called', fakeAsync(() => {
      const mockPostId = 1;
      service.updatePostLikes(mockPostId).then((postId) => {
        expect(postId).toEqual(mockPostId);
      });
    }));
  });
});
