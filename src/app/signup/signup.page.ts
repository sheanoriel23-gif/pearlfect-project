import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage {
  name = '';
  email = '';
  phone = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private ngZone: NgZone
  ) {}

  /** Signup form submission */
  async signup() {
    if (!this.name || !this.email || !this.password || !this.phone) {
      return this.showToast('Please fill in all fields', 'danger');
    }

    try {
      await this.authService.signup(this.email, this.password, this.name, this.phone);
      const user = this.authService.getUser();

      await this.showToast(`Welcome, ${user?.name || 'User'}!`, 'success');

      // Redirect to home after successful signup
      this.ngZone.run(() => this.router.navigate(['']));
    } catch (err) {
      this.showToast('Signup failed: ' + (err as Error).message, 'danger');
    }
  }

  /** Navigate to login page */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  /** Navigate back to home page (Back button) */
  goHome() {
    this.ngZone.run(() => this.router.navigate(['/home']));
  }

  /** Toast helper */
  private async showToast(message: string, type: 'success' | 'danger' = 'danger') {
  const toast = await this.toastCtrl.create({
    message,
    duration: 1500,
    position: 'top',
    color: type === 'success' ? 'tertiary' : type, // success → tertiary, danger → danger
    cssClass: 'custom-toast'
  });
  await toast.present();
}

}
