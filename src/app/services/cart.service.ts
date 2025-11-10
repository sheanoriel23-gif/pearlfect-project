import { Injectable } from '@angular/core';
import { AuthService, UserProfile } from './auth.service';

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

  private customerInfo: { name: string; number: string } = { 
    name: 'Guest', 
    number: '' 
  };

  private orderInfo: { 
    address: string; 
    paymentMethod: string; 
    gcash?: string; 
    card?: string; 
    shippingFee?: number; 
    orderId?: string; // ✅ Added field for static Order ID
  } = {
    address: '',
    paymentMethod: ''
  };

  constructor(private authService: AuthService) {
    const user: UserProfile | null = this.authService.getUser();
    if (user) {
      this.customerInfo = { name: user.name, number: user.phone };
    }
  }

  // ---------------- CART FUNCTIONS ----------------
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
      this.items.push({ ...item });
    }
  }

  getCartItems(): CartItem[] {
    return [...this.items];
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

  // ---------------- CUSTOMER INFO ----------------
  setCustomerInfo(name: string, number: string) {
    this.customerInfo = { name, number };
  }

  getCustomerInfo() {
    const user: UserProfile | null = this.authService.getUser();
    if (user) {
      return { name: user.name, number: user.phone };
    }
    return { ...this.customerInfo };
  }

  // ---------------- ORDER INFO ----------------
  setOrderInfo(
    address: string, 
    paymentMethod: string, 
    gcash?: string, 
    card?: string, 
    shippingFee?: number,
    orderId?: string // ✅ Add parameter for order ID
  ) {
    this.orderInfo = { 
      address, 
      paymentMethod, 
      gcash, 
      card, 
      shippingFee, 
      orderId // ✅ Store order ID
    };
  }

  getOrderInfo() {
    return { ...this.orderInfo };
  }
}
