import { AuthService } from './services/auth.service';

export function initFirebaseAuthFactory(authService: AuthService) {
  return () => authService.waitForAuth();
}
