import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { Post } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  storedPosts: Post[] = [];

  constructor(private authSerivce: AuthService) {}

  onPostAdded(post) {
    this.storedPosts.push(post);
  }

  ngOnInit(): void {
    this.authSerivce.authAuthUser();  
  }
}
