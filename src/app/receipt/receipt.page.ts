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
  subtotal: number = 0;
  shippingFee: number = 0;
  total: number = 0;

  customerName: string = '';
  customerNumber: string = '';
  address: string = '';
  paymentMethod: string = '';
  orderId: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.subtotal = this.cartService.getTotal();

    const order = this.cartService.getOrderInfo();
    this.address = order.address;
    this.paymentMethod = order.paymentMethod;
    this.shippingFee = order.shippingFee || 0;
    this.orderId = order.orderId || 'N/A';

    this.total = this.subtotal + this.shippingFee;

    const customer = this.cartService.getCustomerInfo();
    this.customerName = customer.name;
    this.customerNumber = customer.number;
  }

  goHome() {
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}
