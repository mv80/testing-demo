import { ComponentFixture } from '@angular/core/testing';

export class PostComponentPageObject<T>{
    constructor(private fixture : ComponentFixture<T>) {
    }

    get title():string {
        return this.fixture.nativeElement.querySelector('.post__title').textContent;
    }
    get body():string {
        return this.fixture.nativeElement.querySelector('.post__body').textContent;
    }
    get likeBtn():string {
        return this.fixture.nativeElement.querySelector('.fa-thumbs-up');
    }
}