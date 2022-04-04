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
    'get',
    'put'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientServiceMock }],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   //Testing Observable  - Subscribe and Assert method 
  describe('getPosts', () => {
   beforeEach(() => {
    httpClientServiceMock.get.and.returnValue(of([...postsMock]));
   });
    it('should return number of posts as expected', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          expect(postsData.length).toEqual(NUMBER_OF_POSTS);
          done();
        });
    });
    it('should return post with is liked equal false and number of likes is set to a number', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          const postItem = postsData[0];
          expect(postsData.every(post => post.isLiked === false)).toBeTruthy();
          expect(postsData.every(post => typeof post.likes === 'number')).toBeTruthy();
          expect(postItem.likes).toEqual(jasmine.any(Number));
          done();
        });
    });
  });
  // Testing Promises 
  describe('updatePostLikes', () => {
    const mockPostId = 1;
    const postToUpdate = postsMock.find(post => post.id === mockPostId) as IPost;
    const expectedResult = postsMock.find(post => post.id === mockPostId) as IPost;
    let spy;
    beforeEach(() => {
      spy = httpClientServiceMock.put.and.returnValue(postToUpdate);
    })
    // 2 options for writing
    //using async await 
    it('should return the updated post object once called', async() => {
      const postToUpdate = postsMock.find(post => post.id === mockPostId) as IPost;
      const expectedResult = postsMock.find(post => post.id === mockPostId) as IPost;
      const result = await service.updatePostLikes(postToUpdate);
      
      expect(result).toEqual(expectedResult);
    });
     //using fakeAsync and then  
    it('should return the post id once called', fakeAsync(() => {
      service.updatePostLikes(postToUpdate).then((result) => {
        
        expect(result).toEqual(expectedResult);
      });
    }));
  });
});
