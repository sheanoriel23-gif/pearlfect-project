import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentData, DocumentReference } from '@firebase/firestore';

export interface Product {
  id?: string;         // Firestore document ID
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  /** Get all products */
  getProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  /** Get products by category */
  getProductsByCategory(category: string): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    const q = query(productsCollection, where('category', '==', category));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  /** Get single product by ID */
  getProductById(id: string): Observable<Product | undefined> {
    const productDoc = doc(this.firestore, `products/${id}`);
    return docData(productDoc, { idField: 'id' }) as Observable<Product | undefined>;
  }

  /** Add new product */
  async addProduct(product: Product): Promise<DocumentReference<DocumentData>> {
    const productsCollection = collection(this.firestore, 'products');
    return await addDoc(productsCollection, product);
  }
}
