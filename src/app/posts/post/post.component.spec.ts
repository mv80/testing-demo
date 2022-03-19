import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { IPost } from './post.model';
import { PO } from './post.po';

@Component({
  selector: `host-component`,
  template: `<app-post (onPostLike)="onUpdateLikes($event)" [post]="post"></app-post>`
})
class HostComponent {
  public post :IPost = {
    id:1,
    title: 'post 1 title',
    body: 'post 1 body',
    isLiked: false,
    likes: 10,
    userId: 11
  };

  public onUpdateLikes($event: number): void {
  }
}
let po;
describe('PostComponent', () => {
  let hostComponent: HostComponent;
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent, HostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(HostComponent);
    po = new PO<HostComponent>(hostFixture);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

 
  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });
  it('should show expected title', () => {
    const titleText = hostFixture.nativeElement.querySelector('.post__title').textContent;
    expect(titleText).toEqual(hostComponent.post.title);
  });
  it('should show expected title', () => {
    const titleText: string = po.title;
    expect(titleText).toEqual(hostComponent.post.title);
  });
  fit('should show expected body', () => {
    const postBodyText = po.body;
    expect(postBodyText).toEqual(hostComponent.post.body);
  });
  it('should call host onUpdateLikes once click on add like icon', () => {
    const spy = spyOn(hostComponent, 'onUpdateLikes');
    const addLikeIcon = hostFixture.nativeElement.querySelector('.post__add-like--img');
    addLikeIcon.click();
    hostFixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(hostComponent.post.id);
  });
 
});
