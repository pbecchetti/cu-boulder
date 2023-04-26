import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  user = sessionStorage.getItem('user');
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['/sign-in']);
    }
  }
}
