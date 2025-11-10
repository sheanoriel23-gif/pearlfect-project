import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonMenuButton   
  ],
})
export class DevelopersPage {
  developers = [
    { name: 'Dematera, Charles Lorenz', role: 'Full Stack Developer', email: 'qclpdematera@tip.edu.ph', specialty: 'Mobile & Web Apps', image: 'assets/developers/charles.png' },
    { name: 'Garcia, Bon Andrew', role: 'Full Stack Developer', email: 'qbacgarcia@tip.edu.ph', specialty: 'React & Express', image: 'assets/developers/bon.png' },
    { name: 'Lapuz, Abigail', role: 'Full Stack Developer', email: 'qa-lapuz@tip.edu.ph', specialty: 'Angular & Node.js', image: 'assets/developers/abi.png' },
    { name: 'Oriel, Shean Owen', role: 'Full Stack Designer', email: 'qsohoriel@tip.edu.ph', specialty: 'UI/UX & Backend', image: 'assets/developers/owen.png' },
    { name: 'Tan, Jermaine Chritian', role: 'Full Stack Developer', email: 'qjcntan@tip.edu.ph', specialty: 'Project & Code Management', image: 'assets/developers/tan.png' }
  ];
}
