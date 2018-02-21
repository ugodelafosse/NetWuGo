import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.params.id;

    this.apiService.getMessages(userId);
  }
}
