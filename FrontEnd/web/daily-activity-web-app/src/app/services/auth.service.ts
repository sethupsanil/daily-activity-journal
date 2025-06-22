import { Injectable } from '@angular/core';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { auth } from '../config/firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private initialized = new BehaviorSubject<boolean>(false);
  private user: User | null = null;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser.next(user);
      this.initialized.next(true); // Mark as initialized once auth state is resolved
    });
  }

  async getToken(forceRefresh = false): Promise<string | null> {
    await firstValueFrom(this.initialized); // Wait until Firebase resolves auth state
    const user = auth.currentUser;
    return user ? await user.getIdToken(forceRefresh) : null;
  }

  getUser() {
    return this.currentUser.asObservable();
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }

  waitForAuth(): Promise<void> {
    return new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => {
        this.user = user;
        unsub();
        resolve();
      });
    });
  }
}
