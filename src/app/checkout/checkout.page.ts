import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CheckoutPage implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  address: string = '';
  paymentMethod: string = '';
  gcashNumber: string = '';
  cardNumber: string = '';

  // Add these
  customerName: string = '';
  customerNumber: string = '';
  sugarLevel?: string; // Add this
  iceLevel?: string; 

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
  this.cartItems = this.cartService.getCartItems();
  this.total = this.cartService.getTotal();

  // Get customer info from service
  const info = this.cartService.getCustomerInfo();
  this.customerName = info.name;
  this.customerNumber = info.number;
}

getAddonNames(addons: any[]): string {
  if (!addons || addons.length === 0) return '';
  return addons.map(a => a.name).join(', ');
}

placeOrder() {
  if (!this.address || !this.paymentMethod) {
    alert('Please fill out all required fields.');
    return;
  }

  // Save customer and order info to service
  this.cartService.setCustomerInfo(this.customerName, this.customerNumber);
  this.cartService.setOrderInfo(this.address, this.paymentMethod, this.gcashNumber, this.cardNumber);

  // Navigate to receipt
  this.router.navigate(['/receipt']);

  // Do NOT clear the cart here
}

}