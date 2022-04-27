import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { PostComponent } from './post.component';
import { IPost } from './post.model';
import { PostComponentPageObject } from './post.po';
@Component({
  selector: `host-component`,
  template: `<app-post (onPostLike)="onUpdateLikes($event)" [post]="postItem"></app-post>`
})
class HostComponent {
  public postItem: IPost = {
    id: 1,
    title: 'post 1 title',
    body: 'post 1 body',
    isLiked: false,
    likes: 10,
    userId: 11
  };

  public onUpdateLikes($event: number): void {
  }
}
let pageObject;

describe('PostComponent', () => {
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent, HostComponent],
      providers: [BrowserModule]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostComponent);
    pageObject = new PostComponentPageObject<HostComponent>(hostFixture.nativeElement);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });
  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
  //test that element is displayed correctly
    describe('post title', () => {
      it('should show expected title', () => {
        const titleText = hostFixture.nativeElement.querySelector('.post__title').textContent;
        expect(titleText).toEqual(hostComponent.postItem.title);
      });
      //same test - using page object
      it('should show expected title', () => {
        const titleText: string = pageObject.title;
        expect(titleText).toEqual(hostComponent.postItem.title);
      });
    });
 
 describe('click on like icon', () => {
    afterEach(() => {
      hostComponent.postItem.isLiked = false;
    });
    //check that event emitter has fired
    it('should call host onUpdateLikes once click on add like icon', () => {
      const spy = spyOn(hostComponent, 'onUpdateLikes');
      const likeIcon = pageObject.likeBtn;
      likeIcon.click();
      hostFixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(hostComponent.postItem.id);
    });
    // check that element has css class 
    it('should add CSS class "liked" once post isLiked is true', () => {
      hostComponent.postItem.isLiked = true;
      hostFixture.detectChanges();
      expect(pageObject.addLikeSection.classList.contains('liked')).toBeTrue();
    });
  });

});
