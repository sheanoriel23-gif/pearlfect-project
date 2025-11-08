import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SplashScreenPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Automatically navigate to home after 2 seconds
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 2000); // 2000ms = 2 seconds
  }
}
