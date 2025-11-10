import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../services/cart.service';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.page.html',
  styleUrls: ['./product-options.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProductOptionsPage {
  @Input() product!: Product; // received full product from ProductsPage

  sugarLevel: string = '50%';
  iceLevel: string = 'Normal Ice';

  addons = [
    { name: 'Nata de Coco', price: 10, selected: false },
    { name: 'Pearl', price: 15, selected: false },
    { name: 'Cream Cheese', price: 20, selected: false },
    { name: 'Pudding', price: 15, selected: false },
  ];

  constructor(private modalCtrl: ModalController) {}

  get totalPrice(): number {
    const addonTotal = this.addons
      .filter(a => a.selected)
      .reduce((sum, a) => sum + a.price, 0);
    return this.product.price + addonTotal;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onAddToCart() {
    const selectedAddons: { [key: string]: number } = {};
    this.addons.forEach(a => {
      if (a.selected) selectedAddons[a.name] = a.price;
    });

    const cartItem: CartItem = {
      product: this.product,
      quantity: 1,
      sugar: this.sugarLevel,
      ice: this.iceLevel,
      addons: selectedAddons,
      totalPrice: this.totalPrice
    };

    this.modalCtrl.dismiss(cartItem);
  }
}
