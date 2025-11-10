import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, MenuController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, UserProfile } from '../services/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class SideMenuComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isLoggedIn = false;
  user: UserProfile = {
    uid: '',
    name: 'Guest',
    email: '',
    phone: '',
    photoURL: 'assets/images/user.png'
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

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.authService.userProfile$.subscribe(profile => {
      if (profile) {
        this.user = profile;
        this.isLoggedIn = true;
      } else {
        this.user = { uid: '', name: 'Guest', email: '', phone: '', photoURL: 'assets/images/user.png' };
        this.isLoggedIn = false;
      }
    });
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  handleAuthAction() {
    this.closeMenu();
    if (this.isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /** Trigger hidden file input */
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

/** Handle file selection and store as Base64 in Firestore */
async changeProfilePicture(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !this.isLoggedIn) return;

  const toast = await this.toastCtrl.create({
    message: 'Uploading...',
    duration: 0,
    position: 'top',
    cssClass: 'custom-toast', // <-- apply your purple theme
  });
  await toast.present();

  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result as string;

      // Update Firestore profile directly
      await this.authService.updateUserProfile({ photoURL: base64String });

      // Update local UI instantly
      this.user.photoURL = base64String;

      toast.message = 'Profile picture updated!';
      setTimeout(() => toast.dismiss(), 1500);
    };

    reader.readAsDataURL(file);
  } catch (err) {
    console.error('Failed to upload image:', err);
    toast.message = 'Failed to upload profile picture.';
    toast.color = 'danger'; // optional, could remove since cssClass handles color
    setTimeout(() => toast.dismiss(), 1500);
  } finally {
    input.value = '';
  }
}

async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 1500,
    position: 'top',
    icon: 'checkmark-circle-outline',
    cssClass: 'custom-toast', // <-- apply purple theme
  });
  await toast.present();
}

}
