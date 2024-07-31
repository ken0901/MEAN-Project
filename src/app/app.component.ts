import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostCreateComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MEAN-Project';
}
