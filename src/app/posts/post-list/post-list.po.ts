import { PostComponentPageObject } from '../post/post.po';

export class PostListComponentPageObject<T>{
    constructor(private element : HTMLElement) {
    }
    get posts(): PostComponentPageObject<T>[] {
        let pageObjectItems = [];
        this.element.querySelectorAll('[automation-id="post-item"]').forEach(postItem => {
           pageObjectItems.push(new PostComponentPageObject(postItem as HTMLElement))
        })
        return pageObjectItems; 
    }
}