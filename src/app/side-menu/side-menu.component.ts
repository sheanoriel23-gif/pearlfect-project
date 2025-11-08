import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class SideMenuComponent {
  constructor(private menuCtrl: MenuController){}
  user = {
    name: 'Leigh Anne Cruz',
    number: '0912 345 6789',
    image: 'assets/images/user.png',
  };

  menuItems = [
    { title: 'Home', icon: 'home-outline', url: '/home' },
    { title: 'Company History', icon: 'time-outline', url: '/company-history' },
    { title: 'Our Products', icon: 'pricetag-outline', url: '/products' },
    { title: 'Cart', icon: 'cart-outline', url: '/cart' },
    { title: 'About the App', icon: 'information-circle-outline', url: '/about-app' },
    { title: 'Developers', icon: 'people-outline', url: '/developers' },
    { title: 'Contact Us', icon: 'call-outline', url: '/contact' },
  ];

  closeMenu() {
    this.menuCtrl.close();
  }
}
