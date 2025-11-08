import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductOptionsPage } from '../product-options/product-options.page';
import { CartService, CartItem } from '../services/cart.service'; // make sure path is correct
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


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
  categories = ['all', 'milk-tea', 'matcha', 'fruit-tea', 'coffee', 'snacks'];

products = [
  { 
    name: 'Okinawa Milk Tea', 
    price: 79, 
    category: 'milk-tea', 
    image: 'assets/images/matcha.png',
    description: 'A creamy blend of roasted brown sugar syrup, black tea, and chewy pearls.'
  },
  { 
    name: 'Tiger Brown Sugar', 
    price: 109, 
    category: 'milk-tea', 
    image: 'assets/images/tiger.jpg',
    description: 'Signature brown sugar streaks with premium milk and tapioca pearls.'
  },
  { 
    name: 'Matcha Latte', 
    price: 99, 
    category: 'matcha', 
    image: 'assets/images/matcha-latte.jpg',
    description: 'Japanese matcha blended with creamy milk for a smooth and earthy taste.'
  },
  { 
    name: 'Mango Fruit Tea', 
    price: 89, 
    category: 'fruit-tea', 
    image: 'assets/images/mango.jpg',
    description: 'Refreshing mango-flavored tea with real fruit bits and golden pearls.'
  },
  { 
    name: 'Latte Coffee', 
    price: 99, 
    category: 'coffee', 
    image: 'assets/images/latte.jpg',
    description: 'Classic espresso-based latte with rich, creamy milk foam.'
  },
  { 
    name: 'Cheese Tarts', 
    price: 49, 
    category: 'snacks', 
    image: 'assets/images/cheese-tart.jpg',
    description: 'Flaky pastry filled with soft, creamy cheese — perfect with milk tea.'
  }
];


  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private cartService: CartService, 
    private toastCtrl: ToastController,
    private router: Router
  ) 
  {
    const category = this.route.snapshot.paramMap.get('category');
    if (category) this.selectedCategory = category;
  }

  ionViewWillEnter() {
    this.showBanner = false;
    setTimeout(() => (this.showBanner = true), 10);
  }

  onImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.add('loaded');
  }

  goToCart() {
  this.router.navigate(['/cart']); // assumes your CartPage route is /cart
}


  get filteredProducts() {
    let filtered = this.selectedCategory === 'all'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);

    if (this.searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
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


  async openProductOptions(product: any) {
  const modal = await this.modalCtrl.create({
    component: ProductOptionsPage,
    componentProps: { product }
  });

  await modal.present(); // show the modal first

  // wait for modal to be dismissed
  const { data } = await modal.onDidDismiss();

  if (data) {
    this.cartService.addToCart(data as CartItem);
    console.log('Added to cart:', data);

    // show toast
    this.presentToast('Added to cart successfully!');
  }
}
}