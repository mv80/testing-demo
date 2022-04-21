import { ComponentFixture } from '@angular/core/testing';

export class PostComponentPageObject<T>{
    constructor(private fixture : ComponentFixture<T>) {
    }

    get title():string {
        return this.fixture.nativeElement.querySelector('[automation-id="post-title"]').textContent;
    }
    get body():string {
        return this.fixture.nativeElement.querySelector('[automation-id="post-body"]').textContent;
    }
    get likeBtn(): HTMLElement {
        return this.fixture.nativeElement.querySelector('[automation-id="post-like-icon"]');
    }
    get addLikeSection(): HTMLElement {
        return this.fixture.nativeElement.querySelector('[automation-id="add-like-section"]');
    }
}