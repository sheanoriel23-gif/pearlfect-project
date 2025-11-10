import { Component } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductOptionsPage } from '../product-options/product-options.page';
import { CartService, CartItem } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ProductService, Product } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  selectedCategory: string = 'all';

  // Categories from Firestore (or predefined if needed)
  categories = [
    { name: 'Pearlfect Specials', value: 'pearlfect-specials', image: 'assets/images/pearlfect.png' },
    { name: 'Classic Milk Tea', value: 'classic-milktea', image: 'assets/images/milktea.png' },
    { name: 'Cheesecake', value: 'cheesecake', image: 'assets/images/cheesecake.png' },
    { name: 'Cream Cheese', value: 'cream-cheese', image: 'assets/images/cream-cheese.png' },
    { name: 'Matcha', value: 'matcha', image: 'assets/images/matcha.png' },
    { name: 'Fruit Tea', value: 'fruit-tea', image: 'assets/images/fruit-tea.png' },
  ];

  featuredDrinks: Product[] = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ionViewWillEnter() {
    this.loadFeaturedDrinks();
  }

  // Load Pearlfect Specials from Firestore
  loadFeaturedDrinks() {
    this.productService.getProductsByCategory('pearlfect-specials').subscribe(products => {
      this.featuredDrinks = products;
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToCategory(category: string) {
    this.router.navigate(['/products', { category }]);
  }

  async openProductOptions(product: Product) {
    if (!this.authService.isLoggedIn()) {
      const toast = await this.toastCtrl.create({
        message: 'Please log in to add items to your cart.',
        duration: 2500,
        position: 'top',
        color: 'danger',
        icon: 'alert-circle-outline',
        buttons: [
          {
            text: 'Login',
            role: 'cancel',
            handler: () => this.router.navigate(['/login'])
          }
        ]
      });
      await toast.present();
      return;
    }

    const modal = await this.modalCtrl.create({
      component: ProductOptionsPage,
      componentProps: { product }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.cartService.addToCart(data as CartItem);
      this.presentToast('Added to cart successfully!');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'tertiary',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();
  }
}
