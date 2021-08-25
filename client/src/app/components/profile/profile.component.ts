import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  loggedInUser: any;
  userId: any;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params.id
    if(!this.userId)
    {
      this.loggedInUser =JSON.parse(localStorage.getItem('user') || '{}')
      this.userId = this.loggedInUser._id
    }
    
      this.authService.getProfile(this.userId).subscribe(
        (data) => {
          this.user = data.user
      })
  }

}
