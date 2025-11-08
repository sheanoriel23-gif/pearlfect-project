import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ReceiptPage implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  customerName: string = '';
  customerNumber: string = '';
  address: string = '';
  paymentMethod: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    // Get cart items and total
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();

    // Get customer info
    const customer = this.cartService.getCustomerInfo();
    this.customerName = customer.name;
    this.customerNumber = customer.number;

    // Get order info (address, payment method, optional GCash/card)
    const order = this.cartService.getOrderInfo();
    this.address = order.address;
    this.paymentMethod = order.paymentMethod;
  }

  goHome() {
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}


