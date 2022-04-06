import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { IPost } from '../post/post.model';
import { PostService } from './post.service';
import { NUMBER_OF_POSTS } from './posts.consts';
import { postsMock } from './posts.mock';


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

    it('should call httpClientServiceMock get', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe(() => {
          expect(httpClientServiceMock.get).toHaveBeenCalled();
          done();
        });
    });
  });
  // Testing Promises 
  describe('updatePostLikes', () => {
   
    const postToUpdate = {
      userId: 1,
      id: 1,
      title: 'post 1 title',
      body: 'post 1 body',
      isLiked: false,
      likes: 100
    } as IPost;
    
    const updatedPost = {...postToUpdate};
    updatedPost.isLiked = true;
    updatedPost.likes++; 

    let httpPutSpy;
    
    beforeEach(() => {
      httpPutSpy = httpClientServiceMock.put.and.returnValue(of(updatedPost));
    })
    // 2 options for writing
    //using async await 
    it('should return the updated post object once called', async() => {
      const result = await service.updatePostLikes(postToUpdate);
      expect(result).toEqual(updatedPost);
    });
     //using fakeAsync and then  
    it('should call http service put function with updated object', fakeAsync(() => {
      const url = `https://jsonplaceholder.typicode.com/posts/${postToUpdate.id}`
      service.updatePostLikes(postToUpdate).then(() => {
        expect(httpPutSpy).toHaveBeenCalledWith(url,postToUpdate);
      });
    }));
  });
});
