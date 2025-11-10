import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) {}

  /** Login form submission */
  async login() {
  try {
    const user = await this.authService.login(this.email, this.password);

    await this.showToast(`Welcome, ${user.name}!`, 'success');

    this.ngZone.run(() => this.router.navigate(['']));
  } catch {
    await this.showToast('Invalid email or password', 'danger');
  }
}


  /** Navigate to signup page */
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  /** Navigate back to home page (Back button) */
  goHome() {
    this.ngZone.run(() => this.router.navigate(['/home']));
  }

  /** Toast helper */
  private async showToast(
  message: string,
  type: 'success' | 'danger' = 'danger'
) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 1500,
    position: 'top',
    color: type === 'success' ? 'tertiary' : 'danger', // <-- dynamic color
    cssClass: 'custom-toast'
  });
  await toast.present();
}

}
