import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userProfile: UserProfile | null = null;
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);

  readonly userProfile$ = this.userProfileSubject.asObservable();
  readonly isLoggedIn$ = this.userProfile$.pipe(map(user => !!user));

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await this.loadUserProfile(user.uid);
      } else {
        this.clearUser();
      }
    });
  }

  async signup(email: string, password: string, name: string, phone: string): Promise<UserProfile> {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);

    const profile: UserProfile = {
      uid: user.uid,
      name,
      email,
      phone,
      photoURL: 'assets/images/user.png',
    };

    await setDoc(doc(this.firestore, 'users', user.uid), profile);
    this.setUser(profile);
    return profile;
  }

  async login(email: string, password: string): Promise<UserProfile> {
    const { user } = await signInWithEmailAndPassword(this.auth, email, password);
    const docSnap = await getDoc(doc(this.firestore, 'users', user.uid));

    const profile: UserProfile = docSnap.exists()
      ? (docSnap.data() as UserProfile)
      : { uid: user.uid, name: user.displayName || 'User', email, phone: '', photoURL: 'assets/images/user.png' };

    this.setUser(profile);
    return profile;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.clearUser();
  }

  getUser(): UserProfile | null {
    return this.userProfile;
  }

  isLoggedIn(): boolean {
    return !!this.userProfile;
  }

  /** 🔹 Only updates Firestore and local state, no Firebase Auth */
  async updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!this.userProfile) return;

    const uid = this.userProfile.uid;
    const userRef = doc(this.firestore, 'users', uid);

    await updateDoc(userRef, updates);

    // Update local state
    this.userProfile = { ...this.userProfile, ...updates };
    this.userProfileSubject.next(this.userProfile);
  }

  private setUser(profile: UserProfile) {
    this.userProfile = profile;
    this.userProfileSubject.next(profile);
  }

  private clearUser() {
    this.userProfile = null;
    this.userProfileSubject.next(null);
  }

  private async loadUserProfile(uid: string) {
    const docSnap = await getDoc(doc(this.firestore, 'users', uid));
    if (docSnap.exists()) {
      this.setUser(docSnap.data() as UserProfile);
    } else {
      this.clearUser();
    }
  }
}
