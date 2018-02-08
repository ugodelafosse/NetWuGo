import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  constructor( private apiService: ApiService ) {}

  postMsg = '';

  post() {
    this.apiService.postMessage({ msg: this.postMsg });
  }
}
