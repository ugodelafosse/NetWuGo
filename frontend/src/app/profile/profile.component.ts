import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  profile;

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.apiService.getProfile(id).subscribe(data => this.profile = data);
  }
}
