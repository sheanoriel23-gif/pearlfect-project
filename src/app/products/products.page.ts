import { Component } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductOptionsPage } from '../product-options/product-options.page';
import { CartService, CartItem } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProductsPage {
  selectedCategory: string = 'all';
  showBanner: boolean = false;
  searchQuery: string = '';
  categories = ['all', 'pearlfect-specials', 'classic-milktea', 'cheesecake', 'cream-cheese', 'matcha', 'fruit-tea'];

  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {
    const category = this.route.snapshot.paramMap.get('category');
    if (category) this.selectedCategory = category.trim().toLowerCase();
  }

  ionViewWillEnter() {
    this.showBanner = false;
    setTimeout(() => (this.showBanner = true), 10);
    this.loadProducts();
  }

  // 🔹 Load all products from Firestore
  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products; // keep original Firestore values
    });
  }

  // 🔹 Filter products by category (case-insensitive) and search
  get filteredProducts() {
    const query = this.searchQuery.toLowerCase().trim();

    return this.products.filter(p => {
      const categoryMatches =
        this.selectedCategory === 'all' ||
        p.category?.toLowerCase().trim() === this.selectedCategory;

      const searchMatches =
        !query || p.name.toLowerCase().includes(query);

      return categoryMatches && searchMatches;
    });
  }

  // 🔹 Show toast messages
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

  // 🔹 Open product options modal
  async openProductOptions(product: Product) {
    if (!this.authService.isLoggedIn()) {
      const toast = await this.toastCtrl.create({
        message: 'Please log in to add items to your cart.',
        duration: 2500,
        position: 'top',
        color: 'danger',
        icon: 'alert-circle-outline',
        cssClass: 'custom-toast',
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

  // 🔹 Navigate to cart page
  goToCart() {
    this.router.navigate(['/cart']);
  }
}
