import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu: any[];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private service : UserService
  ) {}

  ngOnInit() {
    if(this.service.getUser() !== null){
      this.user = this.service.getUser();
      this.userMenu = [{title:'Logout'}];
    }
    else{
      this.user = null;
      this.userMenu = [{title:'Sign up'},{title:'Login'}];
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onMenuClick(event) {
    if (event.title === 'Logout') {
      this.service.updateUser(null);
      this.ngOnInit();
    }
    else if(event.title === 'Sign up'){
      this.router.navigate(['auth/register']);
    }
    else if(event.title === 'Login'){
      this.router.navigate(['auth/login']);
    }
  }
}
