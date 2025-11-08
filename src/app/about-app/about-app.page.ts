import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // needed for *ngFor
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ],
})
export class AboutAppPage {
  features = [
    'Browse our full milk tea and snack menu',
    'Customize your drinks (sugar level, ice level, toppings)',
    'Add items to your cart and place an order'
  ];
}
