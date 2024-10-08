import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts";

@Injectable({
    providedIn:"root"
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(private http: HttpClient,
                private router: Router) {}

    getPosts(postPerPAge: number, currentPage: number) {
        const queryParams = `?pagesize=${postPerPAge}&page=${currentPage}`;
        this.http.get<{message: string, posts: any, maxPosts: number}>(BACKEND_URL + queryParams)
            .pipe(map((postData) => {
                return { posts: postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id,
                            imagePath: post.imagePath,
                            creator:post.creator
                        };
                    }), 
                    maxPosts: postData.maxPosts
                };
            }))
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts.posts;
                this.postsUpdated.next({posts: [...this.posts], postCount: transformedPosts.maxPosts});
            }
        );
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    getPost(id: string) {
        //{...this.posts.find(p => p.id === id)};
        return this.http.get<{_id: string, title: string, content: string, imagePath: string, creator: string}>(BACKEND_URL +"/"+ id);
    }

    addPost(title: string, content: string, image: File) {
        //const post: Post = {id: null, title: title, content: content};
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        // postData.forEach((value, key) => {   
        //     console.log(key, value) 
        // });
        this.http.post<{message: string, post: Post}>(BACKEND_URL, postData).subscribe((responseData) => {
            this.router.navigate(["/"]);
        });
    }

    deletePost(postId: string) {
        return this.http.delete(BACKEND_URL + postId);
    }

    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;
        if(typeof(image) === 'object') {
            const postData = new FormData();
            postData.append("id", id);
            postData.append("title",title);
            postData.append("content",content);
            postData.append("image",image, title);
        } else {
            postData = {id: id, title: title, content: content, imagePath: image, creator: null};
        }
        this.http.put(BACKEND_URL + "/" + id, postData)
            .subscribe(response => {
                this.router.navigate(["/"]);
            });
    }
}