import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService, CartItem } from '../services/cart.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  subtotal: number = 0;
  shippingFee: number = 49;
  total: number = 0;

  address: string = '';
  paymentMethod: string = '';
  gcashNumber: string = '';
  cardNumber: string = '';

  customerName: string = '';
  customerNumber: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.subtotal = this.cartService.getTotal();
    this.calculateTotal();

    const info = this.cartService.getCustomerInfo();
    this.customerName = info.name;
    this.customerNumber = info.number;
  }

  calculateTotal() {
    this.total = this.subtotal + this.shippingFee;
  }

  getAddonNames(addons: any[]): string {
    if (!addons || addons.length === 0) return '';
    return addons.map(a => a.name).join(', ');
  }

  // --------------- TOAST ---------------
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  // --------------- ORDER ID GENERATOR ---------------
  generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  // --------------- PLACE ORDER ---------------
  async placeOrder() {
    if (!this.address || !this.paymentMethod) {
      this.presentToast('Please fill out all required fields.');
      return;
    }

    const orderId = this.generateOrderId();

    this.cartService.setCustomerInfo(this.customerName, this.customerNumber);
    this.cartService.setOrderInfo(
      this.address,
      this.paymentMethod,
      this.gcashNumber,
      this.cardNumber,
      this.shippingFee,
      orderId
    );

    this.router.navigate(['/receipt']);
  }
}
