import { Routes } from '@angular/router';
import { ActivityFeedComponent } from './pages/activity-feed/activity-feed.component';
import { LogActivityComponent } from './pages/log-activity/log-activity.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'log-activity', component: LogActivityComponent },
  { path: 'activity-feed', component: ActivityFeedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
