import { Injectable } from '@angular/core';

export interface CartItem {
  product: any;
  quantity: number;
  sugar: string;
  ice: string;
  addons: { [key: string]: number };
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  
  // Static customer info for now
  private customerInfo: { name: string; number: string } = { 
    name: 'Juan Dela Cruz', 
    number: '09123456789' 
  };

  private orderInfo: { address: string; paymentMethod: string; gcash?: string; card?: string } = {
    address: '',
    paymentMethod: ''
  };

  constructor() {}

  // ---------------- Cart Methods ----------------
  addToCart(item: CartItem) {
    const existing = this.items.find(i =>
      i.product.name === item.product.name &&
      i.sugar === item.sugar &&
      i.ice === item.ice &&
      JSON.stringify(i.addons) === JSON.stringify(item.addons)
    );

    if (existing) {
      existing.quantity += item.quantity;
      existing.totalPrice += item.totalPrice;
    } else {
      this.items.push({ ...item }); // clone to avoid reference issues
    }
  }

  getCartItems(): CartItem[] {
    return [...this.items]; // return a copy to avoid external mutations
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.totalPrice, 0);
  }

  removeItem(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  clearCart() {
    this.items = [];
  }

  // ---------------- Customer Info ----------------
  setCustomerInfo(name: string, number: string) {
    this.customerInfo = { name, number };
  }

  getCustomerInfo() {
    return { ...this.customerInfo }; // return copy
  }

  // ---------------- Order Info ----------------
  setOrderInfo(address: string, paymentMethod: string, gcash?: string, card?: string) {
    this.orderInfo = { address, paymentMethod, gcash, card };
  }

  getOrderInfo() {
    return { ...this.orderInfo }; // return copy
  }
}
