
export class PostComponentPageObject<T>{
    constructor(private element : HTMLElement) {
    }
    
    get numberOfLikes(): string {
        return this.element.querySelector('[automation-id="likes-number"]').textContent;
    }
    get title():string {
        return this.element.querySelector('[automation-id="post-title"]').textContent;
    }
    get body():string {
        return this.element.querySelector('[automation-id="post-body"]').textContent;
    }
    get likeBtn(): HTMLElement {
        return this.element.querySelector('[automation-id="post-like-icon"]');
    }
    get addLikeSection(): HTMLElement {
        return this.element.querySelector('[automation-id="add-like-section"]');
    }
}