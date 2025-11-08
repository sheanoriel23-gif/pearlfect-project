import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class CartPage {
  cartItems: (CartItem & { selected: boolean })[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ionViewWillEnter() {
  this.cartItems = this.cartService.getCartItems().map(item => ({
    ...item,
    selected: true // default all selected
  }));
}

// Toggle individual selection
toggleItemSelection(item: any) {
  item.selected = !item.selected;
}

// Toggle all items
allSelected: boolean = true;

toggleAll() {
  this.allSelected = !this.allSelected;
  this.cartItems.forEach(item => item.selected = this.allSelected);
}

// Compute total for selected items only
get selectedTotal(): number {
  return this.cartItems
    .filter(item => item.selected)
    .reduce((sum: number, item) => sum + this.calculateItemTotal(item), 0);
}


  increaseQty(item: any) {
    item.quantity++;
    item.totalPrice = this.calculateItemTotal(item);
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = this.calculateItemTotal(item);
    }
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems().map(i => ({ ...i, selected: true }));
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  calculateItemTotal(item: CartItem): number {
  const addonTotal = Object.values(item.addons).reduce(
    (sum: number, price: number) => sum + price,
    0
  );
  return (item.product.price + addonTotal) * item.quantity;
}

  get total(): number {
    return this.cartItems
      .filter(i => i.selected)
      .reduce((sum, item) => sum + item.totalPrice, 0);
  }

  proceedToCheckout() {
    // Pass only selected items
    const selectedItems = this.cartItems.filter(i => i.selected);
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout.');
      return;
    }

    // Navigate to checkout and pass items (via state)
    this.router.navigate(['/checkout'], { state: { items: selectedItems } });
  }
}
