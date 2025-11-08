import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductOptionsPage } from '../product-options/product-options.page';
import { CartService, CartItem } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  selectedCategory: string = 'milk-tea';

  categories = [
    { name: 'Milk Tea', value: 'milk-tea', image: 'assets/images/milktea.png' },
    { name: 'Matcha', value: 'matcha', image: 'assets/images/matcha.png' },
    { name: 'Fruit Tea', value: 'fruit-tea', image: 'assets/images/fru.png' },
    { name: 'Coffee', value: 'coffee', image: 'assets/images/coffee.png' },
    { name: 'Snacks', value: 'snacks', image: 'assets/images/snacks.png' },
  ];

  featuredDrinks = [
    { name: 'Okinawa Pearlfect Milk Tea', price: 79, image: 'assets/images/matcha.png' },
    { name: 'Brown Sugar Pearl Milk Tea', price: 109, image: 'assets/images/brown-sugar.jpg' },
    { name: 'Taro Pearl Milk Tea', price: 89, image: 'assets/images/taro.jpg' },
    { name: 'Matcha Pearl Milk Tea', price: 99, image: 'assets/images/matcha-latte.jpg' },
    { name: 'Honey Pearl Milk Tea', price: 95, image: 'assets/images/honey.jpg' },
  ];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {}

  goToCart() {
  this.router.navigate(['/cart']); // make sure '/cart' route exists in app.routes.ts
}

  goToCategory(category: string) {
    this.router.navigate(['/products', { category }]);
  }

  async openProductOptions(product: any) {
    const modal = await this.modalCtrl.create({
      component: ProductOptionsPage,
      componentProps: { product }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();  // wait for modal to close and get data
    if (data) {
      this.cartService.addToCart(data as CartItem);
      console.log('Added to cart:', data);
       this.presentToast('Added to cart successfully!');
    }
  }

  async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message: message,
    duration: 1500, // 1.5 seconds
    color: 'tertiary', // match your purple palette
    position: 'top',
    icon: 'checkmark-circle-outline'
  });
  await toast.present();
}

}
