import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [FormsModule, CommonModule ,MatInputModule, MatCardModule,MatButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  enteredContent = "";
  enteredTitle = "";

  constructor(private postService: PostsService) {}

  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    
    this.postService.addPost(form.value.title,  form.value.content);
  }
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   this.newPost = postInput.value;
  // }
}
