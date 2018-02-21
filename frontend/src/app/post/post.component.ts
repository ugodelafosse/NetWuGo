import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  constructor(private apiService: ApiService, private authService: AuthService) {}

  postMsg = '';

  post() {
    this.apiService.postMessage({ msg: this.postMsg });
  }
}
