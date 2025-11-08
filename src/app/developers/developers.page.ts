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
    { name: 'Dematera, Charles Lorenz', role: 'Full Stack Developer', email: 'mark.santos@example.com', phone: 'Mobile & Web Apps', image: 'assets/images/dev4.jpg' },
    { name: 'Garcia, Bon Andrew', role: 'Full Stack Developer', email: 'jane.smith@example.com', specialty: 'React & Express', image: 'assets/images/dev2.jpg' },
    { name: 'Lapuz, Abigail', role: 'Full Stack Developer', email: 'john.doe@example.com', specialty: 'Angular & Node.js', image: 'assets/developers/abigail.png' },
    { name: 'Oriel, Shean Owen', role: 'Full Stack Designer', email: 'alice.reyes@example.com', specialty: 'UI/UX & Backend', image: 'assets/images/dev3.jpg' },
    { name: 'Tan, Jermaine Chritian', role: 'Full Stack Developer', email: 'liza.cruz@example.com', specialty: 'Project & Code Management', image: 'assets/images/dev5.jpg' }
  ];
}
