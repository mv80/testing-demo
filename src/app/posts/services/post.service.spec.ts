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

  //Testing Observables 
  describe('getPosts', () => {
    beforeEach(() => {
      httpClientServiceMock.get.and.returnValue(of([...postsMock]));
    });
    it('should return expected number of posts', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          expect(postsData.length).toEqual(NUMBER_OF_POSTS);
          done();
        });
    });


    it('should return post with is liked is false and number of likes is set to a number', (done) => {
      service
        .getPosts()
        .pipe(take(1))
        .subscribe((postsData: IPost[]) => {
          expect(postsData.every(post => post.isLiked === false)).toBeTruthy();
          expect(postsData.every(post => typeof post.likes === 'number')).toBeTruthy();
          const postItem = postsData[0];
          expect(postItem.likes).toEqual(jasmine.any(Number));
          done();
        });
    });


  });

  // Testing Promises 
  describe('updatePostLikes', () => {
    const postItem = {
      userId: 1,
      id: 1,
      title: 'post 1 title',
      body: 'post 1 body',
      isLiked: false,
      likes: 100
    } as IPost;

    const updatedPost = { ...postItem };
    updatedPost.isLiked = true;
    updatedPost.likes++;

    let httpPutSpy;
    const url = `https://jsonplaceholder.typicode.com/posts/${postItem.id}`;
    beforeEach(() => {
      httpPutSpy = httpClientServiceMock.put.and.returnValue(of({ ...updatedPost }));
    })
    // 3 options for writing test for promises
    //using async await 
    it('should return the updated post object once called', async () => {
      await service.updatePostLikes({ ...postItem });
      expect(httpPutSpy).toHaveBeenCalledWith(url, updatedPost);
    });

    //using fakeAsync  
    it('should call http service put function with updated object', fakeAsync(() => {
      service.updatePostLikes({ ...postItem }).then(() => {
        expect(httpPutSpy).toHaveBeenCalledWith(url, updatedPost);
      });
    }));
    //using done 
    it('should call http service put function with updated object', (done) => {
      service.updatePostLikes({ ...postItem }).then(() => {
        expect(httpPutSpy).toHaveBeenCalledWith(url, updatedPost);
        done();
      });
    });
  });

});
