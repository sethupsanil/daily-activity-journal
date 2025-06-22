import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA3D1jThDkx3JQU9sD_s82L5_xsjK1xLb0',
  authDomain: 'daily-activity-web-app.firebaseapp.com',
  projectId: 'daily-activity-web-app',
  storageBucket: 'daily-activity-web-app.firebasestorage.app',
  messagingSenderId: '123456789',
  appId: 'APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
