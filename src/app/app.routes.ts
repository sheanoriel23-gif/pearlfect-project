import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  // <-- set splash screen as default
    loadComponent: () => import('./splash-screen/splash-screen.page').then(m => m.SplashScreenPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'company-history',
    loadComponent: () => import('./company-history/company-history.page').then(m => m.CompanyHistoryPage)
  },
  {
    path: 'about-app',
    loadComponent: () => import('./about-app/about-app.page').then(m => m.AboutAppPage)
  },
  {
    path: 'developers',
    loadComponent: () => import('./developers/developers.page').then(m => m.DevelopersPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage)
  },
  {
    path: 'products',  // new route for Products page
    loadComponent: () => import('./products/products.page').then(m => m.ProductsPage)
  },
  {
  path: 'cart',
  loadComponent: () => import('./cart/cart.page').then(m => m.CartPage)
  },
   {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then(m => m.CheckoutPage), // ✅ new
  },
  {
  path: 'receipt',
  loadComponent: () => import('./receipt/receipt.page').then(m => m.ReceiptPage)
},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
