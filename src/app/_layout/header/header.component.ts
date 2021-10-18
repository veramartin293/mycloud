import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userName:string;

  constructor(private authService:AuthService) {
    this.userName = authService.getAuthenticatedUser().name;
  }

  ngOnInit(): void {
  }

}
