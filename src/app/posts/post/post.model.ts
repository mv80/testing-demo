export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    likes: number;
    isLiked: boolean;
}